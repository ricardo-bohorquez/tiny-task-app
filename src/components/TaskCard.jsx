import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export function TaskCard({ task }) {
  const { deleteTask } = useContext(TaskContext);

  return (
    <>
      <li>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button
          onClick={() => {
            confirm(
              `¿Está seguro que desea eliminar la siguiente tarea? \n "${task.title}"`
            ) === true
              ? deleteTask(task.id)
              : {};
          }}
        >
          Eliminar tarea
        </button>
      </li>
    </>
  );
}
