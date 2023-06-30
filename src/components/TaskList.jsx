import { useEffect, useContext } from "react";
import TaskCard from "./TaskCard";

import { TaskContext } from "../context/TaskContext";

function TaskList() {
  const { tasks } = useContext(TaskContext);
  useEffect(() => {}, []);

  return tasks.length === 0 ? (
    <h2>No hay tareas agregadas</h2>
  ) : (
    <section className="task-list">
      <div className="pending-task">
        <h3>Tareas pendientes:</h3>
        <ul className="list">
          {tasks.map((t, i) => (
            <TaskCard key={t.id} task={t} index={i} />
          ))}
        </ul>
      </div>
      <div className="done-task">
        <h3>Tareas realizadas:</h3>
        <ul className="list"></ul>
      </div>
    </section>
  );
}

export default TaskList;
