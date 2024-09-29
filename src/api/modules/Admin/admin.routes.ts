import { FastifyInstance as FI, FastifyPluginOptions as FO } from "fastify";
import {
	createAdminController,
	createAdminSchema,
} from "./useCases/createAdmin";
import { ICreateAdminDTO } from "./useCases/createAdmin/entities/createAdmin.DTO";
import { loginAdminController, loginAdminSchema } from "./useCases/loginAdmin";
import { ILoginAdminDTO } from "./useCases/loginAdmin/entities/loginAdmin.DTO";
import { readSelfController, readSelfSchema } from "./useCases/readSelf";
import { handleAdminLogin } from "@application/api/middlewares/handleAdminLogin";
import { readAllController, readAllSchema } from "./useCases/readAll";

const adminRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: ILoginAdminDTO }>("/login", {
		schema: loginAdminSchema,
		handler: async (request, reply) => {
			return loginAdminController.handle(request, reply);
		},
	});

	fastify.post<{ Body: ICreateAdminDTO }>("/create", {
		schema: createAdminSchema,
		preHandler: handleAdminLogin,
		handler: async (request, reply) => {
			return createAdminController.handle(request, reply);
		},
	});

	fastify.get("/read/self", {
		schema: readSelfSchema,
		preHandler: handleAdminLogin,
		handler: async (request, reply) => {
			return readSelfController.handle(request, reply);
		},
	});

	fastify.get("/read/all", {
		schema: readAllSchema,
		preHandler: handleAdminLogin,
		handler: async (request, reply) => {
			return readAllController.handle(request, reply);
		},
	});
};

export { adminRouter };
