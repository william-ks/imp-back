import { FastifyInstance as FI, FastifyPluginOptions as FO } from "fastify";
// import { userRouter } from "./modules/User/user.routes";

const routesRegister = async (fastify: FI, options: FO) => {
	// fastify.register(userRouter, { prefix: "/user" });
};

export { routesRegister };
