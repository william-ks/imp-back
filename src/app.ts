import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import "dotenv/config";
import { FastifyInstance, fastify as FastifyMaster } from "fastify";
import { handleErrors } from "./api/middlewares/handleErrors";
import { routesRegister } from "./api/routes";
import { swaggerOptions, swaggerUiOptions } from "./config/swegger";

const fastify: FastifyInstance = FastifyMaster();

fastify.setErrorHandler(handleErrors);

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(fastifySwaggerUi, swaggerUiOptions);

fastify.register(routesRegister);

export { fastify };
