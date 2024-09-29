import { FastifyReply as FY, FastifyRequest as FQ } from "fastify";

class ReadSelfController {
	constructor() {}

	async handle(req: FQ, reply: FY) {
		const { id, password, isDisabled, adminFeature, ...admin } = req.admin;

		return reply.send(admin);
	}
}

export { ReadSelfController };
