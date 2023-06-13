import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { ModalErrorEmpty, displayErrorModal } from "../components/ModalErrorEmpty";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask } = useContext(TaskContext);

  function handleSubmit(e) {
    if (title === `` || description === ``) {
      e.preventDefault();
      displayErrorModal("flex");
    } else {
      e.preventDefault();
      displayErrorModal("none");
      createTask(title, description);
      setTitle("");
      setDescription("");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          placeholder="Escribe el título de la nueva tarea"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
        />
        <textarea
          placeholder="Escribe una descripción para la nueva tarea"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button>Agregar tarea</button>
      </form>
      <ModalErrorEmpty />
    </>
  );
}

export default TaskForm;
