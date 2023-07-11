import { useContext } from "react";
import ModalDelete from "./ModalDelete";
import ModalTaskDescription from "./ModalTaskDescription";
import "animate.css";
import dots from "../icons/ellipsis-solid.svg";
import { TaskContext } from "../context/TaskContext";

function TaskCard({ task = {}, index = "" }) {
  const { viewModal, setViewModal, markDone } = useContext(TaskContext);

  return (
    <li className="animate__animated" id={index + `-element`}>
      <div>
        <h4>{task.title}</h4>
        <img
          src={dots}
          onClick={() =>
            setViewModal({
              state: true,
              id: task.id,
              type: `description`,
            })
          }
        />
      </div>
      <div className="buttons-container">
        <button onClick={() => markDone(task)}>
          {task.done === false ? `Marcar lista` : `Marcar pendiente`}
        </button>
        {task.done === false ? (
          <button
            onClick={() =>
              setViewModal({
                state: true,
                id: task.id,
                type: `delete`,
              })
            }
          >
            Eliminar tarea
          </button>
        ) : (
          <></>
        )}
      </div>
      <span>Se creó el {task.creationDate}</span>
      {viewModal.state &&
      viewModal.id === task.id &&
      viewModal.type === `delete` ? (
        <ModalDelete task={task} idx={index} />
      ) : (
        <></>
      )}
      {viewModal.state &&
      viewModal.id === task.id &&
      viewModal.type === `description` ? (
        <ModalTaskDescription task={task} idx={index} />
      ) : (
        <></>
      )}
    </li>
  );
}
export default TaskCard;
