import { useEffect, useState } from "react";
import Header from "./componentes/Header";
import TaskList from "./componentes/TaskList";
import TaskInput from "./componentes/TaskInput";
import Footer from "./componentes/Footer";
import EmptyState from "./componentes/EmptyState";
import "./App.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App(){
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  // 🔹 GET - Obtener tareas
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error al obtener tareas:", error);
      });
  }, []);

  // 🔹 POST - Crear tarea
  const addTask = (taskText: string) => {
    if(taskText.trim() === ""){
      setError("La tarea no puede estar vacía");
      setTimeout(() => setError(""), 2000);
      return;
    }

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: taskText })
    })
    .then(response => response.json())
    .then((data: Task) => {
      setTasks([data, ...tasks]);
    })
    .catch((error) => {
      console.error("Error al crear tarea:", error);
    });
  };

  // 🔹 DELETE - Eliminar tarea
  const deleteTask = (id: number) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    })
    .catch((error) => {
      console.error("Error al eliminar tarea:", error);
    });
  };

  // 🔹 PUT - Cambiar estado (completar / descompletar)
  const toggleTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if(!task) return;

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: !task.completed })
    })
    .then(response => response.json())
    .then((updatedTask: Task) => {
      setTasks(tasks.map(t =>
        t.id === id ? updatedTask : t
      ));
    })
    .catch((error) => {
      console.error("Error al actualizar tarea:", error);
    });
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return(
    <div className="app-container">
      <div className="card">
        <Header />
        <TaskInput addTask={addTask}/>
        {error && <div className="error">{error}</div>}

        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <TaskList 
            tasks={tasks} 
            deleteTask={deleteTask} 
            toggleTask={toggleTask}
          />
        )}

        <Footer 
          total={tasks.length} 
          completed={completedCount} 
          pending={pendingCount}
        />
      </div>
    </div>
  )
}

export default App;