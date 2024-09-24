import { nanoid } from "nanoid";

const uuidGen = (): string => {
	return nanoid();
};

export { uuidGen };
