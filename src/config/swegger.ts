const swaggerOptions = {
	swagger: {
		info: {
			title: "APP NAME",
			description: "APP DESC",
			version: "1.0.0",
		},
		host: "localhost",
		schemes: ["http"],
		consumes: ["application/json"],
		produces: ["application/json"],
	},
};

const swaggerUiOptions = {
	routePrefix: "/docs",
	exposeRoute: true,
};

export { swaggerOptions, swaggerUiOptions };
