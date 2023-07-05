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
        {tasks.filter((t) => t.done === false).length === 0 ? (
            <h4>No hay tareas por realizar</h4>
          ) : (
            tasks
              .filter((t) => t.done === false)
              .map((t, i) => <TaskCard key={t.id} task={t} index={i} />)
          )}
        </ul>
      </div>
      <div className="done-task">
        <h3>Tareas realizadas:</h3>
        <ul className="list">
          {tasks.filter((t) => t.done === true).length === 0 ? (
            <h4>No ha realizado ninguna tarea</h4>
          ) : (
            tasks
              .filter((t) => t.done === true)
              .map((t, i) => <TaskCard key={t.id} task={t} index={i} />)
          )}
        </ul>
      </div>
    </section>
  );
}

export default TaskList;
