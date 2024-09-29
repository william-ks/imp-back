import { FastifyReply as FY, FastifyRequest as FQ } from "fastify";
import { ReadAllService } from "./readAll.service";

class ReadAllController {
	constructor(private service: ReadAllService) {}

	async handle(req: FQ, reply: FY) {
		const admins = await this.service.execute();

		return reply.send(admins);
	}
}

export { ReadAllController };
