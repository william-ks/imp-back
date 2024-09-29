import { ICreateAdminDTO } from "./entities/createAdmin.DTO";
import { createAdminZod } from "./entities/createAdmin.zod";
import { IAdminRepository } from "../../repository/IAdminRepository";
import { uuidGen } from "@application/api/provider/uuidGen";
import { handlePass } from "@application/api/provider/handlePass";

class CreateAdminService {
	constructor(private adminRepository: IAdminRepository) {}

	async execute(props: ICreateAdminDTO) {
		createAdminZod.parse(props);

		const emailAlreadyExists = await this.adminRepository.findByEmail(
			props.email,
		);

		if (emailAlreadyExists) {
			if (emailAlreadyExists.isDisabled) {
				throw {
					code: 400,
					message: "Email already exists but is disabled.",
				};
			}

			throw {
				code: 400,
				message: "Email already exists.",
			};
		}

		const hashPass = await handlePass.hash(props.password);

		const publicId = uuidGen();

		await this.adminRepository.create({
			...props,
			publicId,
			password: hashPass,
		});
	}
}

export { CreateAdminService };
