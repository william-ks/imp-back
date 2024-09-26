import jwt from "jsonwebtoken";

const handleToken = {
	generateToken: (publicId: string): string => {
		return jwt.sign(
			{
				sub: publicId,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: "1h",
			},
		);
	},
};

export { handleToken };
