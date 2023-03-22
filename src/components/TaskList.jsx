import { useContext } from "react";
import { TaskCard } from "./TaskCard";
import { TaskContext } from "../context/TaskContext";

export function TaskList() {
  const { tasks } = useContext(TaskContext);

  return tasks.length === 0 ? (
    <h2>No hay tareas agregadas</h2>
  ) : (
    <ul className="task-list">
      {tasks.map((t, index) => (
        <TaskCard key={index} task={t} />
      ))}
    </ul>
  );
}
