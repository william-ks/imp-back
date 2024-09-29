import { FastifyReply, FastifyRequest } from "fastify";
import { handleToken } from "../provider/handleToken";
import { AdminRepository } from "../modules/Admin/repository/AdminRepository";

const handleAdminLogin = async (req: FastifyRequest, res: FastifyReply) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization || !authorization.includes("Bearer")) {
			throw new Error("Token is required");
		}

		const token = authorization.split(" ")[1];

		const { sub } = handleToken.verify(token);

		const adminRepository = new AdminRepository();

		const admin = await adminRepository.findByPublicId(sub as string, true);

		if (!admin || admin.isDisabled) {
			throw new Error("Invalid token");
		}

		req.admin = admin;
	} catch (e) {
		if (e.message === "jwt expired") {
			throw {
				code: 401,
				message: "Token has expired",
			};
		} else {
			throw {
				code: 401,
				message: e.message,
			};
		}
	}
};

export { handleAdminLogin };
