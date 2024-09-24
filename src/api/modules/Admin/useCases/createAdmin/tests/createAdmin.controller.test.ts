import { describe, test, expect, vi } from "vitest";
import { FastifyReply as FY, FastifyRequest as FQ } from "fastify";
import { CreateAdminController } from "../createAdmin.controller";
import { CreateAdminService } from "../createAdmin.service";
import { ICreateAdminDTO } from "../entities/createAdmin.DTO";

// Mock do CreateAdminService
const mockCreateAdminService = {
	execute: vi.fn(),
};

describe("CreateAdminController tests", () => {
	test("should call service with correct data and return 201 status", async () => {
		// Instanciando o controller com o serviço mockado
		const controller = new CreateAdminController(
			mockCreateAdminService as unknown as CreateAdminService,
		);

		// Mock da request e da reply
		const mockRequest = {
			body: {
				name: "Admin User",
				email: "admin@example.com",
				password: "securePassword123",
			},
		} as FQ<{ Body: ICreateAdminDTO }>;

		const mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn(),
		} as unknown as FY;

		// Executa o método handle
		await controller.handle(mockRequest, mockReply);

		// Verifica se o serviço foi chamado com os dados corretos
		expect(mockCreateAdminService.execute).toHaveBeenCalledWith({
			name: "Admin User",
			email: "admin@example.com",
			password: "securePassword123",
		});

		// Verifica se o status 201 foi retornado
		expect(mockReply.status).toHaveBeenCalledWith(201);
		expect(mockReply.send).toHaveBeenCalled();
	});
});
