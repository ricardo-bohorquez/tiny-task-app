import { TaskSection } from "./components/TaskSection";
import { TaskContextProvider } from "./context/TaskContext";

function App() {
  return (
    <main className="App">
      <h1>Lista de cosas por hacer</h1>
      <TaskContextProvider>
        <TaskSection />
      </TaskContextProvider>
    </main>
  );
}

export default App;
