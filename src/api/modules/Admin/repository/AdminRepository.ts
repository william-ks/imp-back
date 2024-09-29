import { Admin } from "../model/Admin";
import { IAdminRepository, ICreateAdmin } from "./IAdminRepository";
import { prisma } from "@application/config/prisma";

class AdminRepository implements IAdminRepository {
	private format(admin: Admin): Admin {
		const features = [];

		const { adminFeature } = admin;

		adminFeature.forEach((el) => {
			features.push({
				publicId: el.feature.publicId,
				title: el.feature.title,
			});
		});

		return {
			...admin,
			features,
		};
	}

	async findByPublicId(publicId: string, formated?: boolean): Promise<Admin> {
		const admin = await prisma.admin.findFirst({
			where: { publicId },
			include: {
				adminFeature: {
					include: {
						feature: true,
					},
				},
			},
		});

		if (!formated) return admin;

		return this.format(admin);
	}

	async findByEmail(email: string, formated?: boolean): Promise<Admin> {
		const admin = await prisma.admin.findFirst({
			where: { email },
			include: {
				adminFeature: {
					include: {
						feature: true,
					},
				},
			},
		});

		if (!formated) return admin;

		return this.format(admin);
	}

	async findAll(formated?: boolean): Promise<Admin[]> {
		const admins = await prisma.admin.findMany({
			include: {
				adminFeature: {
					include: {
						feature: true,
					},
				},
			},
			orderBy: {
				name: "asc",
			},
		});

		if (!formated) return admins;

		const data = admins.map((adm) => {
			return this.format(adm);
		});

		return data;
	}

	async create(props: ICreateAdmin): Promise<void> {
		await prisma.admin.create({ data: props });
	}
}

export { AdminRepository };
