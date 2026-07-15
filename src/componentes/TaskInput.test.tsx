import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {
    it("llama a addTask con el texto escrito por el usuario", async () => {
        // Arrange
        const addTask = vi.fn();
        const usuario = userEvent.setup();

        render(<TaskInput addTask={addTask} />);

        // Act
        const input = screen.getByLabelText("Nueva tarea");
        const botonAgregar = screen.getByRole("button", {
            name: "Agregar",
        });

        await usuario.type(input, "Comprar pan");
        await usuario.click(botonAgregar);

        // Assert
        expect(addTask).toHaveBeenCalledTimes(1);
        expect(addTask).toHaveBeenCalledWith("Comprar pan");
    });

    it("no llama a addTask si el campo está vacío", async () => {
        // Arrange
        const addTask = vi.fn();
        const usuario = userEvent.setup();

        render(<TaskInput addTask={addTask} />);

        // Act
        const botonAgregar = screen.getByRole("button", {
            name: "Agregar",
        });

        await usuario.click(botonAgregar);

        // Assert
        expect(addTask).not.toHaveBeenCalled();
    });

    it("limpia el campo después de agregar una tarea", async () => {
        // Arrange
        const addTask = vi.fn();
        const usuario = userEvent.setup();

        render(<TaskInput addTask={addTask} />);

        const input = screen.getByLabelText("Nueva tarea");

        // Act
        await usuario.type(input, "Estudiar React");
        await usuario.click(
            screen.getByRole("button", { name: "Agregar" }),
        );

        // Assert
        expect(input).toHaveValue("");
    });

    it("agrega la tarea al presionar Enter", async () => {
        // Arrange
        const addTask = vi.fn();
        const usuario = userEvent.setup();

        render(<TaskInput addTask={addTask} />);

        // Act
        const input = screen.getByLabelText("Nueva tarea");

        await usuario.type(input, "Terminar proyecto{Enter}");

        // Assert
        expect(addTask).toHaveBeenCalledTimes(1);
        expect(addTask).toHaveBeenCalledWith("Terminar proyecto");
    });

    it("no agrega una tarea que solo contiene espacios", async () => {
        // Arrange
        const addTask = vi.fn();
        const usuario = userEvent.setup();

        render(<TaskInput addTask={addTask} />);

        // Act
        const input = screen.getByLabelText("Nueva tarea");

        await usuario.type(input, "   ");
        await usuario.click(
            screen.getByRole("button", { name: "Agregar" }),
        );

        // Assert
        expect(addTask).not.toHaveBeenCalled();
    });
});