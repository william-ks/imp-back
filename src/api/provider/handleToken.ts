import jwt from "jsonwebtoken";

const handleToken = {
	generateToken: (publicId: string): string => {
		return jwt.sign(
			{
				sub: publicId,
				exp: Math.floor(Date.now() / 1000) + 60 * 60,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: "1h",
			},
		);
	},
};

export { handleToken };
