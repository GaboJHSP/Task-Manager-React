import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { config } from "dotenv";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

config();

const connectionString = process.env.DATABASE_URL;

if (
    typeof connectionString !== "string" ||
    connectionString.trim() === ""
) {
    throw new Error(
        "DATABASE_URL no está definida en backend/.env",
    );
}

const adapter = new PrismaPg({
    connectionString,
});

export const prisma = new PrismaClient({
    adapter,
});

const app = express();
const SECRET_KEY = "mi_clave_secreta";

app.use(cors());
app.use(express.json());

/* =========================
   MIDDLEWARE JWT
========================= */

const verifyToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({
            error: "Token requerido",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({
            error: "Token inválido",
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({
            error: "Token inválido o expirado",
        });
    }
};

/* =========================
   RUTA PRINCIPAL
========================= */

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

/* =========================
   TASKS
========================= */

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error en GET /tasks:", error);

        return res.status(500).json({
            error: "Error al obtener tareas",
        });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const { text } = req.body;

        if (typeof text !== "string" || text.trim() === "") {
            return res.status(400).json({
                error: "El texto de la tarea es requerido",
            });
        }

        const newTask = await prisma.task.create({
            data: {
                text: text.trim(),
                completed: false,
            },
        });

        return res.status(201).json(newTask);
    } catch (error) {
        console.error("Error en POST /tasks:", error);

        return res.status(500).json({
            error: "Error al crear tarea",
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                error: "Identificador de tarea inválido",
            });
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                completed: req.body.completed,
            },
        });

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error en PUT /tasks/:id:", error);

        return res.status(500).json({
            error: "Error al actualizar tarea",
        });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                error: "Identificador de tarea inválido",
            });
        }

        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        return res.status(200).json({
            message: "Deleted",
        });
    } catch (error) {
        console.error("Error en DELETE /tasks/:id:", error);

        return res.status(500).json({
            error: "Error al eliminar tarea",
        });
    }
});

/* =========================
   AUTH
========================= */

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        const token = jwt.sign(
            { username },
            SECRET_KEY,
            { expiresIn: "1h" },
        );

        return res.status(200).json({
            token,
        });
    }

    return res.status(401).json({
        error: "Credenciales inválidas",
    });
});

/* =========================
   RUTA PROTEGIDA
========================= */

app.get("/private", verifyToken, (req, res) => {
    return res.status(200).json({
        message: "Acceso permitido",
    });
});

export default app;