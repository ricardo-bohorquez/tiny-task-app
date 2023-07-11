import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function ModalDelete({ task = {}, idx = "" }) {
  const { deleteTask, resetModalProps, setViewModal } = useContext(TaskContext);
  return (
    <section
      className="modal-body"
      id={idx + `-modal`}
      style={{ display: "flex" }}
    >
      <div className="modal-content">
        <h3>¿Está seguro que desea eliminar la siguiente tarea?</h3>
        <label>{task.title}</label>
        <div className="selection-container">
          <button
            id="confirmDelete"
            onClick={() => {
              setViewModal(resetModalProps);
              deleteTask(task.id, idx);
            }}
          >
            Confirmar
          </button>
          <button id="cancelDelete" onClick={() => setViewModal(resetModalProps)}>
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalDelete;
