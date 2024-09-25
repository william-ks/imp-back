/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoginAdminDTO } from "./entities/loginAdmin.DTO";
import { loginAdminZod } from "./entities/loginAdmin.zod";
import { IAdminRepository } from "../../repository/IAdminRepository";
import { handlePass } from "@application/api/provider/handlePass";
import { handleToken } from "@application/api/provider/handleToken";

class LoginAdminService {
	constructor(private adminRepository: IAdminRepository) {}

	async execute(props: ILoginAdminDTO) {
		loginAdminZod.parse(props);

		const user = await this.adminRepository.findByEmail(props.email);

		if (!user) {
			throw {
				code: 404,
				message: "User not found",
			};
		}

		if (!user.wasAccepted) {
			throw {
				code: 403,
				message: "User not accepted",
			};
		}

		if (user.isDisabled) {
			throw {
				code: 403,
				message: "User is disabled",
			};
		}

		const isValidPass = await handlePass.compare({
			pass: props.password,
			hash: user.password,
		});

		if (!isValidPass) {
			throw {
				code: 401,
				message: "Invalid email and/or password.",
			};
		}

		const token = handleToken.generateToken(user.publicId);

		const {
			isDisabled,
			wasAccepted,
			password: _,
			id,
			publicId,
			...returnUser
		} = user;

		return {
			user: {
				...returnUser,
				id: publicId,
			},
			token,
		};
	}
}

export { LoginAdminService };
