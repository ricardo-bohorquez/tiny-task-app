import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function ModalTaskDescription({ task = {}, idx = "" }) {
  const { resetModalProps ,setViewModal } = useContext(TaskContext);
  return (
    <section
      className="modal-body"
      id={`task-desc-${idx}`}
      style={{ display: "flex" }}
    >
      <div className="modal-content modal-task-description">
        <h4>{task.title}</h4>
        <label>Descripción:</label>
        <p>{task.description}</p>
        <button onClick={() => setViewModal(resetModalProps)}>
          Cerrar
        </button>
      </div>
    </section>
  );
}

export default ModalTaskDescription;
