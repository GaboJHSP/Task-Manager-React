import TaskCard from "./TaskCard";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type Props = {
    tasks: Task[];
    deleteTask: (id: number) => void;
    toggleTask: (id: number) => void;
};

function TaskList({ tasks, deleteTask, toggleTask }: Props){
    return(
        <ul className="task-list">
            {
                tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        text={task.text}
                        completed={task.completed}
                        onDelete={() => deleteTask(task.id)}
                        onToggle={() => toggleTask(task.id)}
                    />
                ))
            }
        </ul>
    );
}

export default TaskList;