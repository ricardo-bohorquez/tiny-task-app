import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/task";
import { months } from "../data/months";
import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTask] = useState([]);
  useEffect(() => setTask(data), []);

  function createTask(title, description) {
    const id = uuidv4();
    const creationDate = `${dayjs().date()} de ${months[dayjs().month()].name}, ${dayjs().year()}`;
    const creationHour = `${dayjs().hour()}:${dayjs().minute()}`;
    setTask([
      ...tasks,
      {
        id,
        title,
        description,
        creationDate,
        creationHour
      },
    ]);
    localStorage.setItem(id, JSON.stringify({ title, description, creationDate, creationHour }));
  }

  function deleteTask(id, indexElement, indexModal) {
    document.getElementById(`${indexModal}-modal`).style.display = "none";
    document.getElementById(`${indexElement}-element`).classList.add(`animate__backOutRight`);
    setTimeout(() => {
      localStorage.removeItem(id);
      setTask(tasks.filter((tsk) => tsk.id !== id));
      document
        .getElementById(`${indexElement}-element`)
        .classList.remove(`animate__backOutRight`);
    }, 800);
  }

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
      {props.children}
    </TaskContext.Provider>
  );
}
