const loginAdminSchema = {
	tags: ["Admin"],
	body: {
		type: "object",
		properties: {
			email: { type: "string", format: "email" },
			password: { type: "string" },
		},
	},
	response: {
		200: {
			type: "object",
			properties: {
				user: {
					type: "object",
					properties: {
						id: { type: "string" },
						name: { type: "string" },
						email: { type: "string", format: "email" },
						createdAt: {
							type: "string",
							format: "date-time",
						},
						updatedAt: {
							type: "string",
							format: "date-time",
						},
					},
				},
				token: { type: "string" },
			},
		},
		404: {
			description: "User not found.",
			type: "object",
			properties: {
				message: {
					type: "string",
					example: "User not found.",
				},
			},
		},
		401: {
			description: "Invalid email or password.",
			type: "object",
			properties: {
				message: {
					type: "string",
				},
			},
		},
		403: {
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

export { loginAdminSchema };
