import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const signInJwt = (params, time = `60m`) => {
	return jwt.sign(params, process.env.SECRET_KEY, {
		expiresIn: time,
	});
};

export const hashPassword = async (password) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};
