import { FastifyReply as FY, FastifyRequest as FQ } from "fastify";
import { CreateAdminService } from "./createAdmin.service";
import { ICreateAdminDTO } from "./entities/createAdmin.DTO";

class CreateAdminController {
	constructor(private service: CreateAdminService) {}

	async handle(req: FQ<{ Body: ICreateAdminDTO }>, reply: FY) {
		const { name, email, password } = req.body;

		await this.service.execute({ name, email, password });

		return reply.status(201).send();
	}
}

export { CreateAdminController };
