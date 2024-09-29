import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const main = async () => {
	try {
		let features = await prisma.feature.findMany();

		// Se não houver features no banco, cria-as
		if (features.length === 0) {
			await prisma.feature.createMany({
				data: [
					{
						publicId: nanoid(),
						title: "Criar admins",
						code: "admin:create",
					},
					{
						publicId: nanoid(),
						title: "Listar todos os admins",
						code: "admin:readAll",
					},
					{
						publicId: nanoid(),
						title: "Aceitar um admin",
						code: "admin:accept",
					},
				],
			});

			// Recupera os features recém-criados
			features = await prisma.feature.findMany();
		}

		const admin = await prisma.admin.findFirst();

		if (!admin) {
			// Criando um novo admin
			const newAdmin = await prisma.admin.create({
				data: {
					name: "William Krisley",
					email: "will.ks@gmail.com",
					password: await bcrypt.hash("teste123", 10),
					publicId: nanoid(),
				},
			});

			// Cria as associações de features para o admin na tabela intermediária AdminFeature
			const adminFeatures = features.map((feature) => ({
				publicId: nanoid(),
				adminId: newAdmin.id,
				featuresId: feature.id,
			}));

			await prisma.adminFeature.createMany({
				data: adminFeatures,
			});
		}
	} catch (e) {
		console.error("Erro ao executar a SEED", e);
	} finally {
		await prisma.$disconnect();
	}
};

main();
