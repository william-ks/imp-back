import { FastifyInstance as FI, FastifyPluginOptions as FO } from "fastify";
import { adminRouter } from "./modules/Admin/admin.routes";

const routesRegister = async (fastify: FI, options: FO) => {
	fastify.register(adminRouter, { prefix: "/admin" });
};

export { routesRegister };
