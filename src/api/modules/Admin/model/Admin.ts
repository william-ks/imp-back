import { nanoid } from "nanoid";

export class Admin {
	public readonly id?: number;
	public readonly publicId: string;
	public name: string;
	public email: string;
	public password: string;

	public isDisabled: boolean = false;

	public createdAt: Date = new Date();
	public updatedAt: Date = new Date();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public adminFeature?: any[] = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public features?: any[] = [];

	constructor(props: Omit<Admin, "publicId">, publicId?: string) {
		Object.assign(this, props);

		if (!publicId) {
			this.publicId = nanoid();
		} else {
			this.publicId = publicId;
		}
	}
}
