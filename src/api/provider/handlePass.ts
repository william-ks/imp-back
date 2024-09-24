import bcrypt from "bcrypt";

const handlePass = {
	hash: async (pass: string): Promise<string> => {
		const hash = await bcrypt.hash(pass, 10);

		return hash;
	},

	compare: async ({ pass, hash }: { pass: string; hash: string }) => {
		return await bcrypt.compare(pass, hash);
	},
};

export { handlePass };
