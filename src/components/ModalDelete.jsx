import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { displayModal } from "./TaskCard";

function ModalDelete({ task, index, id }) {
  const { deleteTask } = useContext(TaskContext);
  return (
    <section
      className="modal-body"
      id={index + `-modal`}
      style={{ display: "none" }}
    >
      <div className="modal-content">
        <h4>¿Está seguro que desea eliminar la siguiente tarea?</h4>
        <label>{task.title}</label>
        <div className="selection-container">
          <button
            id="confirmDelete"
            onClick={() => deleteTask(task.id, index, index)}
          >
            Confirmar
          </button>
          <button id="cancelDelete" onClick={() => displayModal(index)}>
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalDelete;
