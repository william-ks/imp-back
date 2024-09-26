import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const main = async () => {
	try {
		const admin = await prisma.admin.findFirst();

		if (!admin) {
			await prisma.admin.create({
				data: {
					name: "William Krisley",
					email: "will.ks@gmail.com",
					password: await bcrypt.hash("teste123", 10),
					publicId: nanoid(),
					wasAccepted: true,
				},
			});
		}
	} catch (e) {
		console.error("Erro ao executar a SEED");
	}
};

main();
