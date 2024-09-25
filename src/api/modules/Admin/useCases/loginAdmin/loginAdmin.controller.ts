import { FastifyReply as FY, FastifyRequest as FQ } from "fastify";
import { LoginAdminService } from "./loginAdmin.service";
import { ILoginAdminDTO } from "./entities/loginAdmin.DTO";

class LoginAdminController {
	constructor(private service: LoginAdminService) {}

	async handle(req: FQ<{ Body: ILoginAdminDTO }>, reply: FY) {
		const { email, password } = req.body;

		const user = await this.service.execute({ email, password });

		return reply.status(200).send(user);
	}
}

export { LoginAdminController };
