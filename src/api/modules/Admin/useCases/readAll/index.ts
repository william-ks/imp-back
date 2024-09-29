import { AdminRepository } from "../../repository/AdminRepository";
import { ReadAllController } from "./readAll.controller";
import { ReadAllService } from "./readAll.service";
import { readAllSchema } from "./entities/readAll.schema";

const adminRepository = new AdminRepository();
const readAllService = new ReadAllService(adminRepository);
const readAllController = new ReadAllController(readAllService);

export { readAllController, readAllSchema };
