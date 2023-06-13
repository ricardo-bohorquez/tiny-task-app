import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/task";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale("es");

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTask] = useState([]);
  useEffect(() => setTask(data), []);

  function createTask(title, description) {
    const id = uuidv4();
    const creationDate = dayjs().format("DD/MM/YYYY hh:mm a");
    setTask([
      ...tasks,
      {
        id,
        title,
        description,
        creationDate,
      }
    ]);
    localStorage.setItem(
      id,
      JSON.stringify({ title, description, creationDate })
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

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
      {props.children}
    </TaskContext.Provider>
  );
}
