import "../styles/TasksCard.css";

type Props = {
  text: string;
  completed: boolean;
  onDelete: () => void;
  onToggle: () => void;
};

function TaskCard({ text, completed, onDelete, onToggle }: Props) {
  return (
    <li className={`task-card ${completed ? "task-card--completed" : ""}`}>
      <button
        type="button"
        className={`task-status ${completed ? "task-status--completed" : ""}`}
        onClick={onToggle}
        aria-label={
          completed
            ? `Marcar "${text}" como pendiente`
            : `Marcar "${text}" como completada`
        }
        title={completed ? "Marcar como pendiente" : "Completar tarea"}
      >
        {completed ? "✓" : ""}
      </button>

      <div className="task-content">
        <span className="task-text">{text}</span>

        <span className="task-state">
          {completed ? "Completada" : "Pendiente"}
        </span>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="task-button task-button--toggle"
          onClick={onToggle}
          aria-label={
            completed
              ? `Deshacer tarea "${text}"`
              : `Completar tarea "${text}"`
          }
          title={completed ? "Deshacer" : "Completar"}
        >
          {completed ? "↺" : "✓"}
        </button>

        <button
          type="button"
          className="task-button task-button--delete"
          onClick={onDelete}
          aria-label={`Eliminar tarea "${text}"`}
          title="Eliminar tarea"
        >
          ✕
        </button>
      </div>
    </li>
  );
}

export default TaskCard;