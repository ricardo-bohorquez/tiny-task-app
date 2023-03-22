import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/task";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTask] = useState([]);

  function createTask(title, description) {
    setTask([
      ...tasks,
      {
        id: tasks.length,
        title,
        description,
      },
    ]);
  }

  function deleteTask(id) {
    setTask(tasks.filter((tsk) => tsk.id !== id));
  }

  useEffect(() => setTask(data), []);

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
      {props.children}
    </TaskContext.Provider>
  );
}
