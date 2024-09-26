import { Admin } from "@application/api/modules/Admin/model/Admin";
import { FastifyRequest } from "fastify";

declare module "fastify" {
	interface FastifyRequest {
		admin?: Partial<Admin>;
	}
}
