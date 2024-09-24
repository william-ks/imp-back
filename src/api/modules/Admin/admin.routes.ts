import { FastifyInstance as FI, FastifyPluginOptions as FO } from "fastify";
import {
	createAdminController,
	createAdminSchema,
} from "./useCases/createAdmin";
import { ICreateAdminDTO } from "./useCases/createAdmin/entities/createAdmin.DTO";

const adminRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: ICreateAdminDTO }>("/create", {
		schema: createAdminSchema, // Schema de validação
		handler: async (request, reply) => {
			// Aqui você está chamando o controlador
			return createAdminController.handle(request, reply);
		},
	});
};

export { adminRouter };
