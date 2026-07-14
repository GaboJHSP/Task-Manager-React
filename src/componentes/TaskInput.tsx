import "../styles/TaskInput.css";
import { FormEvent, useState } from "react";

type Props = {
    addTask: (text: string) => void;
};

function TaskInput({ addTask }: Props) {
    const [text, setText] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const textoLimpio = text.trim();

        if (textoLimpio === "") {
            return;
        }

        addTask(textoLimpio);
        setText("");
    };

    return (
        <form className="task-input" onSubmit={handleSubmit}>
            <label htmlFor="task-title">Nueva tarea</label>

            <input
                id="task-title"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Escribe una tarea..."
            />

            <button type="submit">
                Agregar
            </button>
        </form>
    );
}

export default TaskInput;