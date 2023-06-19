import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function ModalTaskDescription({ task = {}, idx = "" }) {
  const { setViewDescription } = useContext(TaskContext);
  return (
    <section
      className="modal-body"
      id={`task-desc-${idx}`}
      style={{ display: "flex" }}
    >
      <div className="modal-content modal-task-description">
        <h3>{task.title}</h3>
        <label>Descripción:</label>
        <p>{task.description}</p>
        <button
          onClick={() => setViewDescription({ state: false, id: 0 })}
        >
          Cerrar
        </button>
      </div>
    </section>
  );
}

export default ModalTaskDescription;
