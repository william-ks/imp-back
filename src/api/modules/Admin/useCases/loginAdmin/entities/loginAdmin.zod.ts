import { z } from "zod";

const loginAdminZod = z.object({
	email: z.string().email(),
	password: z.string().max(200),
});

export { loginAdminZod };
