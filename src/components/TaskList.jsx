import { useContext } from "react";
import TaskCard from "./TaskCard";

import { TaskContext } from "../context/TaskContext";

function TaskList() {
  const { tasks } = useContext(TaskContext);
  const donedTasks = tasks.filter((t) => t.done === true);
  const pendingTasks = tasks.filter((t) => t.done === false);

  return tasks.length === 0 ? (
    <h2>No hay tareas agregadas</h2>
  ) : (
    <section className="task-list">
      <div className="pending-task">
        <h3>Tareas pendientes:</h3>
        <ul className="list">
          {pendingTasks.length === 0 ? (
            <h4>No hay tareas por realizar</h4>
          ) : (
            pendingTasks.map((t, i) => (
              <TaskCard key={t.id} task={t} index={i} />
            ))
          )}
        </ul>
      </div>
      <div className="done-task">
        <h3>Tareas realizadas:</h3>
        <ul className="list">
          {donedTasks.length === 0 ? (
            <h4>No ha realizado ninguna tarea</h4>
          ) : (
            donedTasks.map((t, i) => <TaskCard key={t.id} task={t} index={i} />)
          )}
        </ul>
      </div>
    </section>
  );
}

export default TaskList;
