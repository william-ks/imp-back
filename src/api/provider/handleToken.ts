import jwt, { JwtPayload } from "jsonwebtoken";

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

	verify: (token: string): string | JwtPayload => {
		const data = jwt.verify(token, process.env.SECRET_KEY);

		return data;
	},
};

export { handleToken };
