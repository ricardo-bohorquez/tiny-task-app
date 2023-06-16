import { useContext } from "react";
import TaskCard from "./TaskCard";

import { TaskContext } from "../context/TaskContext";

function TaskList() {
  const { tasks } = useContext(TaskContext);

  return tasks.length === 0 ? (
    <h2>No hay tareas agregadas</h2>
  ) : (
    <ul className="task-list">
      {tasks.map((t, i) => (
        <TaskCard key={t.id} task={t} index={i} />
      ))}
    </ul>
  );
}

export default TaskList;
