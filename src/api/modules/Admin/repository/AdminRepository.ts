import { Admin } from "../model/Admin";
import { IAdminRepository, ICreateAdmin } from "./IAdminRepository";
import { prisma } from "@application/config/prisma";

class AdminRepository implements IAdminRepository {
	async findByPublicId(publicId: string): Promise<Admin> {
		const admin = await prisma.admin.findFirst({ where: { publicId } });

		return admin;
	}

	async create(props: ICreateAdmin): Promise<void> {
		await prisma.admin.create({ data: props });
	}
}

export { AdminRepository };
