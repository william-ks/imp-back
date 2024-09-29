const readAllSchema = {
	tags: ["Admin"],
	response: {
		200: {
			description: "Users data",
			type: "array",
			items: {
				properties: {
					publicId: { type: "string" },
					name: { type: "string" },
					email: { type: "string" },
					createdAt: { type: "string", format: "date-time" },
					updatedAt: { type: "string", format: "date-time" },
				},
				additionalProperties: true,
			},
		},
	},
};

export { readAllSchema };
