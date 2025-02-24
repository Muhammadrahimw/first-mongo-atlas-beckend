import {userSchemas} from "../schema/user.schema.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await userSchemas.find({});
		res.status(200).json({status: 200, message: `success`, data: users});
	} catch (error) {
		next(error);
	}
};
