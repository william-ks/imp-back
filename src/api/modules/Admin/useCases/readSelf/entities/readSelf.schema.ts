const readSelfSchema = {
	tags: ["Admin"],
	response: {
		200: {
			description: "User data",
			type: "object",
			properties: {
				publicId: { type: "string" },
				name: { type: "string" },
				email: { type: "string" },
				createdAt: { type: "string", format: "date-time" },
				updatedAt: { type: "string", format: "date-time" },
			},
			additionalProperties: false,
		},
	},
};

export { readSelfSchema };
