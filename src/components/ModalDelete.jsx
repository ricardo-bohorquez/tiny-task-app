import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { displayModalDelete } from "./TaskCard";

function ModalDelete({ task, index }) {
  const { deleteTask } = useContext(TaskContext);
  return (
    <section
      className="modal-body"
      id={index + `-modal`}
      style={{ display: "none" }}
    >
      <div className="modal-content">
        <h3>¿Está seguro que desea eliminar la siguiente tarea?</h3>
        <label>{task.title}</label>
        <div className="selection-container">
          <button id="confirmDelete" onClick={() => deleteTask(task.id, index)}>
            Confirmar
          </button>
          <button id="cancelDelete" onClick={() => displayModalDelete(index)}>
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalDelete;
