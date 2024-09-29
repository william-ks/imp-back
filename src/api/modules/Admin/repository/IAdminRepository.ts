import { Admin } from "../model/Admin";

export interface IAdminRepository {
	findByPublicId(publicId: string, formated?: boolean): Promise<Admin>;
	findByEmail(email: string, formated?: boolean): Promise<Admin>;
	findAll(formated?: boolean): Promise<Admin[]>;
	create(props: ICreateAdmin): Promise<void>;
}

export interface ICreateAdmin {
	publicId: string;
	name: string;
	email: string;
	password: string;
}
