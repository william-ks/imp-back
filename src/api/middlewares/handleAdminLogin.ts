import { FastifyReply, FastifyRequest } from "fastify";
import { handleToken } from "../provider/handleToken";

const handleAdminLogin = async (req: FastifyRequest, res: FastifyReply) => {
	console.log("here");

	try {
		const authorization = req.headers.authorization;
		if (!authorization || !authorization.includes("Bearer")) {
			throw new Error("Token is required");
		}

		const token = authorization.split(" ")[1];

		const data = handleToken.verify(token);

		console.log(data);
	} catch (e) {
		throw {
			code: 401,
			message: e.message,
		};
	}
};

export { handleAdminLogin };
