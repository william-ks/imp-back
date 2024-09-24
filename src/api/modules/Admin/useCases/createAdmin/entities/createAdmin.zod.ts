import { z } from "zod";

const createAdminZod = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

export { createAdminZod };
