const createAdminSchema = {
	tags: ["Admin"],
	body: {
		type: "object",
		required: ["name", "email", "password"],
		properties: {
			name: { type: "string" },
			email: { type: "string", format: "email" },
			password: {
				type: "string",
			},
		},
	},
	response: {
		201: {
			description: "Admin created with success.",
			type: "null",
		},
		400: {
			description: "Error on validation.",

			type: "object",
			properties: {
				message: {
					type: "string",
				},
			},
		},
	},
};

export { createAdminSchema };
