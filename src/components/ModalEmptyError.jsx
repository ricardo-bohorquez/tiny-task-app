import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function ModalEmptyError() {
  const { setViewDataEmptyError } = useContext(TaskContext);
  return (
    <section
      className="modal-body"
      id="modal-error"
      style={{ display: "flex" }}
    >
      <div className="modal-content">
        <h3>No puede crear tareas con títulos ni descripciones vacías</h3>
        <button onClick={() => setViewDataEmptyError(false)} id="acceptError">
          Aceptar
        </button>
      </div>
    </section>
  );
}

export default ModalEmptyError;
