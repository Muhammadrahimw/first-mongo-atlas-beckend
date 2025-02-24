import {totp} from "otplib";
import {userSchemas} from "../schema/user.schema.js";
import {sendOnlyCode, sendVerifyCode} from "../utils/helpers.js";
import {hashPassword, signInJwt} from "../utils/jwt.js";
import {CustomError, ResData} from "../utils/responseHeaders.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import redisClient from "../utils/redisClient.js";

dotenv.config();
totp.options = {step: 120};

export const signIn = async (req, res, next) => {
	try {
		const body = req.body;
		if (!body.email || !body.password)
			throw new CustomError(400, `Email and password are required`);
		const user = await userSchemas.findOne({email: body.email.toLowerCase()});
		if (!user) throw new CustomError(400, `Email or password is incorrect`);
		const checkPassword = await bcrypt.compare(body.password, user.password);
		if (!checkPassword)
			throw new CustomError(400, `Email or password is incorrect`);

		const resData = new ResData(200, `success`, {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: signInJwt({id: user._id, role: user.role}),
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const signUp = async (req, res, next) => {
	try {
		const body = req.body;
		if (!body.name || !body.email || !body.password)
			throw new CustomError(400, `Name, email and password are required`);
		const checkUser = await userSchemas.findOne({
			email: body.email.toLowerCase(),
		});
		if (checkUser)
			throw new CustomError(400, `Already registered with this email`);

		await sendVerifyCode(body);
		await redisClient.setEx(
			`verify_${body.email}`,
			300,
			JSON.stringify({...body})
		);

		const verifyToken = signInJwt({email: body.email}, `5m`);
		const resData = new ResData(200, `Verification code sent to email`, {
			token: verifyToken,
		});

		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const verifyUser = async (req, res, next) => {
	try {
		const {code} = req.body;
		const verifyToken = req.headers.authorization?.split(" ")[1];
		if (!verifyToken) throw new CustomError(400, `Verification token required`);
		let decoded;
		decoded = jwt.verify(verifyToken, process.env.SECRET_KEY);
		const email = decoded.email;
		const secret = process.env.SECRET_KEY + email;
		const isValid = totp.check(code, secret);

		if (!isValid) throw new CustomError(400, `Incorrect code`);

		const savedDataRaw = await redisClient.get(`verify_${email}`);
		if (!savedDataRaw)
			throw new CustomError(400, `Verification data expired or invalid`);
		const savedData = JSON.parse(savedDataRaw);

		const hashedPassword = await hashPassword(savedData.password);

		const newUser = await userSchemas.create({
			name: savedData.name,
			email: savedData.email.toLowerCase(),
			password: hashedPassword,
			role: "user",
		});
		await redisClient.del(`verify_${email}`);

		const token = signInJwt({id: newUser._id, role: newUser.role});
		const resData = new ResData(201, `success`, {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
			token: token,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const signInMail = async (req, res, next) => {
	try {
		const {email} = req.body;
		if (!email) throw new CustomError(400, `Email not defined`);
		await redisClient.setEx(`verify_${email}`, 300, JSON.stringify({email}));
		const verifyToken = signInJwt({email: email}, `5m`);
		await sendOnlyCode(email);
		const resData = new ResData(201, `Verification code sent to email`, {
			token: verifyToken,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const verifySignInMail = async (req, res, next) => {
	try {
		const {code} = req.body;
		const verifyToken = req.headers.authorization?.split(" ")[1];
		if (!verifyToken) throw new CustomError(400, `Verification token required`);
		let decoded;
		decoded = jwt.verify(verifyToken, process.env.SECRET_KEY);
		const email = decoded.email;

		const secret = process.env.SECRET_KEY + email;
		const isValid = totp.check(code, secret);

		if (!isValid) throw new CustomError(400, `Incorrect code`);

		await redisClient.del(`verify_${email}`);
		const findUser = await userSchemas.findOne({email: email});
		const token = signInJwt({id: findUser._id, role: findUser.role});
		const resData = new ResData(201, `success`, {
			id: findUser._id,
			name: findUser.name,
			email: findUser.email,
			role: findUser.role,
			token: token,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const updateMail = async (req, res, next) => {
	try {
		const {email, newEmail} = req.body;
		if (!email || !newEmail)
			throw new CustomError(400, `Email and newEmail not found`);
		const updatedUser = await userSchemas.findOneAndUpdate(
			{email: email},
			{email: newEmail},
			{new: true}
		);
		if (!updatedUser) throw new CustomError(400, `User not found`);
		const resData = new ResData(201, `success`, {email: newEmail});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
