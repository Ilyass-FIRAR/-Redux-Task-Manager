import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import "./App.css"; // Import CSS

const initialState = { tasks: [] };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [...state.tasks, { id: Math.random(), text: action.payload, completed: false }],
      };
    case "TOGGLE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case "REMOVE":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Redux Store
const store = createStore(taskReducer);

// Task Manager Component
const TaskManager = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = React.useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return;
    dispatch({ type: "ADD", payload: taskInput });
    setTaskInput("");
  };

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>➕ Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            {task.text}
            <div className="buttons">
              <button onClick={() => dispatch({ type: "TOGGLE", payload: task.id })}>
                ✅
              </button>
              <button onClick={() => dispatch({ type: "REMOVE", payload: task.id })}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="reset-btn" onClick={() => dispatch({ type: "RESET" })}>
        🔄 Reset Tasks
      </button>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <TaskManager />
  </Provider>
);

export default App;
