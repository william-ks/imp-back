/* eslint-disable no-unused-vars */
import { Admin } from "../model/Admin";

export interface IAdminRepository {
	findByPublicId(publicId: string): Promise<Admin>;
	findByEmail(email: string): Promise<Admin>;
	create(props: ICreateAdmin): Promise<void>;
}

export interface ICreateAdmin {
	publicId: string;
	name: string;
	email: string;
	password: string;
}
