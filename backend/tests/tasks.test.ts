import request from "supertest";
import {
    afterAll,
    describe,
    expect,
    it,
} from "vitest";

import app, { prisma } from "../src/app";

let createdTaskId: number | undefined;

describe("API de tareas", () => {
    it("crea una tarea nueva", async () => {
        // Arrange
        const nuevaTarea = {
            text: "Escribir informe",
        };

        // Act
        const response = await request(app)
            .post("/tasks")
            .send(nuevaTarea);

        // Assert
        expect(response.status).toBe(201);
        expect(response.body.text).toBe("Escribir informe");
        expect(response.body.completed).toBe(false);
        expect(response.body.id).toBeDefined();

        createdTaskId = response.body.id;
    });

    it("lista las tareas creadas", async () => {
        // Act
        const response = await request(app)
            .get("/tasks");

        // Assert
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("no crea una tarea si el texto está vacío", async () => {
        // Act
        const response = await request(app)
            .post("/tasks")
            .send({
                text: "",
            });

        // Assert
        expect(response.status).toBe(400);
        expect(response.body.error).toBe(
            "El texto de la tarea es requerido",
        );
    });

    afterAll(async () => {
        if (createdTaskId !== undefined) {
            await prisma.task
                .delete({
                    where: {
                        id: createdTaskId,
                    },
                })
                .catch(() => {
                    // La tarea ya pudo haber sido eliminada.
                });
        }

        await prisma.$disconnect();
    });
});