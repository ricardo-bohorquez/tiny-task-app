import ModalDelete from "./ModalDelete";
import ModalTaskDescription from "./ModalTaskDescription";
import "animate.css";
import dots from "../icons/ellipsis-solid.svg";

export function displayModalDelete(indexModal) {
  document.getElementById(`${indexModal}-modal`).style.display === "none"
    ? (document.getElementById(`${indexModal}-modal`).style.display = "flex")
    : (document.getElementById(`${indexModal}-modal`).style.display = "none");
}

export function displayTaskDescription(prop, idx) {
  document.getElementById(`task-desc-${idx}`).style.display = prop;
}

function TaskCard({ task, index }) {
  return (
    <li className="animate__animated" id={index + `-element`}>
      <h3>
        {task.title}
        <img src={dots} onClick={() => displayTaskDescription("flex", index)} />
      </h3>
      <ModalTaskDescription task={task} idx={index} />
      <button onClick={() => displayModalDelete(index)}>Eliminar tarea</button>
      <span>Se creó el {task.creationDate}</span>
      <ModalDelete task={task} index={index} />
    </li>
  );
}
export default TaskCard;
