import { AdminRepository } from "../../repository/AdminRepository";
import { CreateAdminController } from "./createAdmin.controller";
import { CreateAdminService } from "./createAdmin.service";
import { createAdminSchema } from "./entities/createAdmin.schema";

const adminRepository = new AdminRepository();
const createAdminService = new CreateAdminService(adminRepository);
const createAdminController = new CreateAdminController(createAdminService);

export { createAdminController, createAdminSchema };