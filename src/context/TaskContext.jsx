import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/task";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale("es");

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [viewDelete, setViewDelete] = useState({ state: false, id: 0 });
  const [viewDescription, setViewDescription] = useState({
    state: false,
    id: 0,
  });
  const [viewDataEmptyError, setViewDataEmptyError] = useState(false);

  const [tasks, setTask] = useState([]);

  const [checked, setChecked] = useState(false);

  useEffect(() => setTask(data), []);

  function createTask(title, description) {
    const id = uuidv4();
    const creationDate = dayjs().format("DD/MM/YYYY hh:mm a");
    const done = false;
    setTask([
      ...tasks,
      {
        id,
        title,
        description,
        creationDate,
        done,
      },
    ]);
    localStorage.setItem(
      id,
      JSON.stringify({ title, description, creationDate, done })
    );
  }

  function deleteTask(id, index) {
    document.getElementById(`${index}-modal`).style.display = "none";
    document
      .getElementById(`${index}-element`)
      .classList.add(`animate__backOutRight`);
    setTimeout(() => {
      localStorage.removeItem(id);
      setTask(tasks.filter((tsk) => tsk.id !== id));
      document
        .getElementById(`${index}-element`)
        .classList.remove(`animate__backOutRight`);
    }, 800);
  }

  function markDone(task) {
    if (task.done === false) {
      task.done = true;
      setTask(
        tasks.map((t) => {
          t.id === task.id ? (t.done = task.done) : {};
        })
      );
      localStorage.setItem(
        task.id,
        JSON.stringify({
          title: task.title,
          description: task.description,
          creationDate: task.creationDate,
          done: task.done,
        })
      );
      return task.done;
    } else if (task.done === true) {
      task.done = false;
      setTask(
        tasks.map((t) => {
          t.id === task.id ? (t.done = task.done) : {};
        })
      );
      localStorage.setItem(
        task.id,
        JSON.stringify({
          title: task.title,
          description: task.description,
          creationDate: task.creationDate,
          done: task.done,
        })
      );
      return task.done;
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        markDone,
        checked,
        setChecked,
        viewDelete,
        setViewDelete,
        viewDescription,
        setViewDescription,
        viewDataEmptyError,
        setViewDataEmptyError,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
