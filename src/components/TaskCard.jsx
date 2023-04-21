import ModalDelete from "./ModalDelete";
import "animate.css";

export function displayModal(indexModal) {
  document.getElementById(`${indexModal}-modal`).style.display === "none"
    ? (document.getElementById(`${indexModal}-modal`).style.display = "flex")
    : (document.getElementById(`${indexModal}-modal`).style.display = "none");
}

function TaskCard({ task, index }) {
  return (
    <li className="animate__animated" id={index + `-element`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => displayModal(index)}>Eliminar tarea</button>
      <span>
        Se creó el {task.creationDate} ({task.creationHour})
      </span>
      <ModalDelete task={task} index={index} />
    </li>
  );
}
export default TaskCard;
