import { ILoginAdminDTO } from "./../entities/loginAdmin.DTO";
import { describe, test, expect, vi } from "vitest";
import { FastifyReply as FY, FastifyRequest as FQ } from "fastify";
import { LoginAdminController } from "../loginAdmin.controller";
import { LoginAdminService } from "../loginAdmin.service";

const mockLoginAdminService = {
	execute: vi.fn(),
};

describe("LoginAdminController tests", () => {
	test("should call loginAdminService.execute with correct data and return 200", async () => {
		const controller = new LoginAdminController(
			mockLoginAdminService as unknown as LoginAdminService,
		);

		const mockRequest = {
			body: {
				email: "admin@example.com",
				password: "securePassword123",
			},
		} as FQ<{ Body: ILoginAdminDTO }>;

		const mockReply = {
			status: vi.fn().mockReturnThis(),
			send: vi.fn(),
		} as unknown as FY;

		await controller.handle(mockRequest, mockReply);

		expect(mockLoginAdminService.execute).toHaveBeenCalledWith({
			email: "admin@example.com",
			password: "securePassword123",
		});
	});
});
