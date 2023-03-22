import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export function TaskSection() {
  return (
    <section className="task-section">
      <TaskForm />
      <TaskList />
    </section>
  );
}
