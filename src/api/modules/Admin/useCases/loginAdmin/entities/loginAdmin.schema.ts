const loginAdminSchema = {
	tags: ["Admin"],
	body: {
		type: "object",
		properties: {
			email: { type: "string", format: "email" },
			password: { type: "string" },
		},
	},
};

export { loginAdminSchema };
