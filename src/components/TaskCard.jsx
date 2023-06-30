import { useContext } from "react";
import ModalDelete from "./ModalDelete";
import ModalTaskDescription from "./ModalTaskDescription";
import "animate.css";
import dots from "../icons/ellipsis-solid.svg";
import { TaskContext } from "../context/TaskContext";

function TaskCard({ task = {}, index = "" }) {
  const { viewDelete, setViewDelete, viewDescription, setViewDescription } =
    useContext(TaskContext);

  return (
    <li className="animate__animated" id={index + `-element`}>
      <div>
        <h4>{task.title}</h4>
        <img
          src={dots}
          onClick={() => setViewDescription({ state: true, id: task.id })}
        />
      </div>
      <div className="buttons-container">
        <button
          onClick={() => {
            if (task.done == false) {
              task.done = true;
              localStorage.setItem(
                task.id,
                JSON.stringify({
                  title: task.title,
                  description: task.description,
                  creationDate: task.creationDate,
                  done: task.done,
                })
              );
            }
          }}
        >
          Marcar Lista
        </button>
        <button onClick={() => setViewDelete({ state: true, id: task.id })}>
          Eliminar tarea
        </button>
      </div>
      <span>Se creó el {task.creationDate}</span>
      {viewDelete.state && viewDelete.id === task.id ? (
        <ModalDelete task={task} idx={index} />
      ) : (
        <></>
      )}
      {viewDescription.state && viewDescription.id === task.id ? (
        <ModalTaskDescription task={task} idx={index} />
      ) : (
        <></>
      )}
    </li>
  );
}
export default TaskCard;
