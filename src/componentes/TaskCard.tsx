import "../styles/TaskCard.css";

type Props = {
    text: string;
    completed: boolean;
    onDelete: () => void;
    onToggle: () => void;
};

function TaskCard({ text, completed, onDelete, onToggle }: Props){
    return(
        <li className={`task-card ${completed ? "completed" : ""}`}>
            <span>{text}</span>
            <div className="actions">
                {
                    completed ? (
                        <button className="undo" onClick={onToggle}>↺</button>
                    ) : (
                        <button className="complete" onClick={onToggle}>✓</button>
                    )
                }
                <button className="delete" onClick={onDelete}>✕</button>
            </div>
        </li>
    );
}

export default TaskCard;