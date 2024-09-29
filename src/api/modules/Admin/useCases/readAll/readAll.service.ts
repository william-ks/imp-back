/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAdminRepository } from "../../repository/IAdminRepository";

class ReadAllService {
	constructor(private adminRepository: IAdminRepository) {}

	async execute() {
		const admins = await this.adminRepository.findAll();

		const data = [];

		admins.forEach((el) => {
			const { id, password, adminFeature, ...elReturn } = el;

			const features = [];

			adminFeature.forEach((els) => {
				features.push({
					publicId: els.feature.publicId,
					title: els.feature.title,
				});
			});

			data.push({ ...elReturn, features });
		});

		return data;
	}
}

export { ReadAllService };
