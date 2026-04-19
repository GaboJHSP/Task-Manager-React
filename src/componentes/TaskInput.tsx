import "../styles/TaskInput.css";
import { useState } from "react";

type Props = {
    addTask: (text: string) => void;
};

function TaskInput({ addTask }: Props){
    const [text, setText] = useState("");

    const handleAdd = () => {
        addTask(text);
        if(text.trim() !== "") setText("");
    };

    return(
        <div className="task-input">
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe una tarea..."
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button onClick={handleAdd}>Agregar</button>
        </div>
    );
}

export default TaskInput;