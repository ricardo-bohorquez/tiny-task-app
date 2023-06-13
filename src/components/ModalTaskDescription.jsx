import { displayTaskDescription } from "../components/TaskCard";
function ModalTaskDescription({ task, idx }) {
  return (
    <section
      className="modal-body"
      id={`task-desc-${idx}`}
      style={{ display: "none" }}
    >
      <div className="modal-content modal-task-description">
        <h3>{task.title}</h3>
        <label>Descripción:</label>
        <p>{task.description}</p>
        <button onClick={() => displayTaskDescription("none", idx)}>
          Cerrar
        </button>
      </div>
    </section>
  );
}

export default ModalTaskDescription;
