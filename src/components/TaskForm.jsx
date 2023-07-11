import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import ModalEmptyError from "./ModalEmptyError";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask, viewModal, setViewModal } = useContext(TaskContext);

  function handleSubmit(e) {
    if (title === `` || description === ``) {
      e.preventDefault();
      setViewModal({ ...viewModal, type: `error` });
    } else {
      e.preventDefault();
      createTask(title, description);
      setTitle("");
      setDescription("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        placeholder="Escribe el título de la nueva tarea"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        autoFocus
        maxLength={25}
      />
      <textarea
        placeholder="Escribe una descripción para la nueva tarea"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        maxLength={250}
      ></textarea>
      <button>Agregar tarea</button>
      {viewModal.type === `error` ? <ModalEmptyError /> : <></>}
    </form>
  );
}

export default TaskForm;
