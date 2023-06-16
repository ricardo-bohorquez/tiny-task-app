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
      <h3>
        {task.title}
        <img src={dots} onClick={() => setViewDescription(true)} />
      </h3>
      <button onClick={() => setViewDelete(true)}>Eliminar tarea</button>
      <span>Se creó el {task.creationDate}</span>
      {viewDelete ? <ModalDelete task={task} idx={index} /> : <></>}
      {viewDescription ? (
        <ModalTaskDescription task={task} idx={index} />
      ) : (
        <></>
      )}
    </li>
  );
}
export default TaskCard;
