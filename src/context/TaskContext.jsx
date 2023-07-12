import { createContext, useState, useEffect } from "react";
import { db } from "../configFirebase.js";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale("es");

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  async function add(id, task) {
    await setDoc(doc(db, "users", id), {
      title: task.title,
      description: task.description,
      creationDate: task.creationDate,
      done: task.done,
    });
  }

  async function read(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  async function erase(id) {
    await deleteDoc(doc(db, "users", id));
  }

  const [tasks, setTask] = useState(
    Object.keys(localStorage).map((key) => {
      let { title, description, creationDate, done } = JSON.parse(
        localStorage.getItem(key)
      );
      return { id: key, title, description, creationDate, done };
    })
  );

  useEffect(() => setTask(tasks), []);

  const resetModalProps = {
    state: false,
    id: 0,
    type: `none`,
  };

  const [viewModal, setViewModal] = useState(resetModalProps);

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
    add(id, { title, description, creationDate, done });
    read(id);
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
    erase(id);
  }

  function markDone(task) {
    task.done === false ? (task.done = true) : (task.done = false);
    setTask(
      tasks.map((t) => {
        t.id === task.id ?? (t.done = task.done);
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
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        markDone,
        resetModalProps,
        viewModal,
        setViewModal,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
