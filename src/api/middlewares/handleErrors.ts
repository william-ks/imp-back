import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

const handleErrors = (
	error: FastifyError,
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log("\x1b[41m%s\x1b[0m", error);

	const defaultError = {
		code: 500,
		message: "Internal Server Error",
	};

	return reply
		.code(Number(error.code) || defaultError.code)
		.send({ message: error.message || defaultError.message });

	if (error.validation) {
		return reply.code(400).send({ message: "Invalid request" });
	} else {
		return reply.code(500).send({ message: "Internal Server Error" });
	}
};

export { handleErrors };
