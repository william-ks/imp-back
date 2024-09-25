import { describe, test, expect, vi } from "vitest";
import { IAdminRepository } from "../../../repository/IAdminRepository";
import { handlePass } from "@application/api/provider/handlePass";
import { LoginAdminService } from "../loginAdmin.service";
import { handleToken } from "@application/api/provider/handleToken";
import { ILoginAdminDTO } from "../entities/loginAdmin.DTO";

const mockAdminRepository: IAdminRepository = {
	findByEmail: vi.fn(),
	create: vi.fn(),
	findByPublicId: vi.fn(),
};

vi.mock("@application/api/provider/handlePass", () => ({
	handlePass: {
		hash: vi.fn(),
		compare: vi.fn(),
	},
}));

vi.mock("@application/api/provider/handleToken", () => ({
	handleToken: {
		generateToken: vi.fn(),
	},
}));

describe("LoginAdminService", () => {
	const service = new LoginAdminService(mockAdminRepository);

	test("should login if email does not exist", async () => {
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce(
			null,
		);
		vi.spyOn(handlePass, "compare").mockResolvedValueOnce(true);

		const adminData: ILoginAdminDTO = {
			email: "admin@example.com",
			password: "securePassword123",
		};

		await expect(service.execute(adminData)).rejects.toEqual({
			code: 404,
			message: "User not found",
		});
	});

	test("should login if email is not accepted", async () => {
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce({
			id: 1,
			publicId: "unique-public-id",
			name: "Admin User",
			email: "admin@example.com",
			password: "hashedPassword",
			isDisabled: false,
			wasAccepted: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const adminData: ILoginAdminDTO = {
			email: "admin@example.com",
			password: "securePassword123",
		};

		await expect(service.execute(adminData)).rejects.toEqual({
			code: 403,
			message: "User not accepted",
		});
	});

	test("should login if email is disabled", async () => {
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce({
			id: 1,
			publicId: "unique-public-id",
			name: "Admin User",
			email: "admin@example.com",
			password: "hashedPassword",
			isDisabled: true,
			wasAccepted: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const adminData: ILoginAdminDTO = {
			email: "admin@example.com",
			password: "securePassword123",
		};

		await expect(service.execute(adminData)).rejects.toEqual({
			code: 403,
			message: "User is disabled",
		});
	});

	test("should login if password is wrong", async () => {
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce({
			id: 1,
			publicId: "unique-public-id",
			name: "Admin User",
			email: "admin@example.com",
			password: "hashedPassword",
			isDisabled: false,
			wasAccepted: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		vi.spyOn(handlePass, "compare").mockResolvedValueOnce(false);

		const adminData: ILoginAdminDTO = {
			email: "admin@example.com",
			password: "securePassword123",
		};

		await expect(service.execute(adminData)).rejects.toEqual({
			code: 401,
			message: "Invalid email and/or password.",
		});
	});

	test("should login without special conditions", async () => {
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce({
			id: 1,
			publicId: "unique-public-id",
			name: "Admin User",
			email: "admin@example.com",
			password: "hashedPassword",
			isDisabled: false,
			wasAccepted: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		vi.spyOn(handleToken, "generateToken").mockReturnValueOnce(
			"token-generated",
		);

		const adminData: ILoginAdminDTO = {
			email: "admin@example.com",
			password: "securePassword123",
		};

		const data = await service.execute(adminData);

		expect(data.user.name).toBe("Admin User");
		expect(data.token).toBe("token-generated");
	});
});
