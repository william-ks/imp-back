import { describe, it, expect, vi } from "vitest";
import { CreateAdminService } from "../createAdmin.service";
import { IAdminRepository } from "../../../repository/IAdminRepository";
import { ICreateAdminDTO } from "../entities/createAdmin.DTO";
import * as uuidModule from "@application/api/provider/uuidGen";
import { handlePass } from "@application/api/provider/handlePass";
import { createAdminZod } from "../entities/createAdmin.zod"; // Importa o Zod para os testes

// Mock do repositório
const mockAdminRepository: IAdminRepository = {
	findByEmail: vi.fn(),
	create: vi.fn(),
	findByPublicId: vi.fn(),
	findAll: vi.fn(),
};

// Mock do uuidGen e handlePass
vi.mock("@application/api/provider/uuidGen", () => ({
	uuidGen: vi.fn(),
}));

vi.mock("@application/api/provider/handlePass", () => ({
	handlePass: {
		hash: vi.fn(),
		compare: vi.fn(),
	},
}));

describe("CreateAdminService", () => {
	const service = new CreateAdminService(mockAdminRepository);

	it("should create an admin if email does not exist", async () => {
		// Simula o email inexistente e o hash e uuid sendo gerados corretamente
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce(
			null,
		);
		vi.spyOn(handlePass, "hash").mockResolvedValueOnce("hashedPassword");
		vi.spyOn(uuidModule, "uuidGen").mockReturnValueOnce("unique-public-id");

		const adminData: ICreateAdminDTO = {
			name: "Admin User",
			email: "admin@example.com",
			password: "securePassword123",
		};

		await service.execute(adminData);

		// Verifica se o hash da senha foi gerado corretamente
		expect(handlePass.hash).toHaveBeenCalledWith("securePassword123");

		// Verifica se o UUID foi gerado
		expect(uuidModule.uuidGen).toHaveBeenCalled();

		// Verifica se o repositório foi chamado com os dados corretos
		expect(mockAdminRepository.create).toHaveBeenCalledWith({
			...adminData,
			password: "hashedPassword",
			publicId: "unique-public-id",
		});
	});

	it("should throw an error if email already exists and is disabled", async () => {
		// Simula o email já existente e desativado
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce({
			id: 1,
			publicId: "unique-public-id",
			name: "Admin User",
			email: "admin@example.com",
			password: "hashedPassword",
			isDisabled: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const adminData: ICreateAdminDTO = {
			name: "Admin User",
			email: "admin@example.com",
			password: "securePassword123",
		};

		await expect(service.execute(adminData)).rejects.toEqual({
			code: 400,
			message: "Email already exists but is disabled.",
		});
	});

	it("should throw an error if email already exists without special conditions", async () => {
		// Simula o email já existente sem condições específicas
		vi.spyOn(mockAdminRepository, "findByEmail").mockResolvedValueOnce({
			id: 1,
			publicId: "unique-public-id",
			name: "Admin User",
			email: "admin@example.com",
			password: "hashedPassword",
			isDisabled: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		const adminData: ICreateAdminDTO = {
			name: "Admin User",
			email: "admin@example.com",
			password: "securePassword123",
		};

		await expect(service.execute(adminData)).rejects.toEqual({
			code: 400,
			message: "Email already exists.",
		});
	});

	// Testes para validação do Zod
	describe("Zod validation", () => {
		it("should validate successfully with correct input", () => {
			const validData = {
				name: "Admin User",
				email: "admin@example.com",
				password: "securePassword123",
			};

			const result = createAdminZod.parse(validData);
			expect(result).toEqual(validData);
		});

		it("should throw an error if name is not a string", () => {
			const invalidData = {
				name: 123, // Invalid name
				email: "admin@example.com",
				password: "securePassword123",
			};

			expect(() => createAdminZod.parse(invalidData)).toThrow();
		});

		it("should throw an error if email is not a valid email", () => {
			const invalidData = {
				name: "Admin User",
				email: "invalid-email", // Invalid email
				password: "securePassword123",
			};

			expect(() => createAdminZod.parse(invalidData)).toThrow();
		});

		it("should throw an error if password is less than 8 characters", () => {
			const invalidData = {
				name: "Admin User",
				email: "admin@example.com",
				password: "short", // Invalid password
			};

			expect(() => createAdminZod.parse(invalidData)).toThrow();
		});
	});
});
