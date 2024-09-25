import { AdminRepository } from "../../repository/AdminRepository";
import { LoginAdminController } from "./loginAdmin.controller";
import { LoginAdminService } from "./loginAdmin.service";
import { loginAdminSchema } from "./entities/loginAdmin.schema";

const adminRepository = new AdminRepository();
const loginAdminService = new LoginAdminService(adminRepository);
const loginAdminController = new LoginAdminController(loginAdminService);

export { loginAdminController, loginAdminSchema };