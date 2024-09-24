const createAdminSchema = {
	tags: ["Admin"],
	body: {
		type: "object",
		properties: {
			name: { type: "string" },
			email: { type: "string", format: "email" },
			password: {
				type: "string",
			},
		},
	},
};

export { createAdminSchema };
