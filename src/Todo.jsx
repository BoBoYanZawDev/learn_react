import { useState } from "react";

export default function Todo() {
  let [todo, setTodo] = useState([
    {
      id: 1,
      title: "Buy a new car",
      completed: false,
    },
    {
      id: 2,
      title: "Buy a new house",
      completed: true,
    },
    {
      id: 3,
      title: "Buy a new bike",
      completed: false,
    },
  ]);
  return (
    <div>
        <h1>To Do List</h1>
        <ul>
      {todo.map((item) => (
        <li key={item.id}>
            {item.completed ? <strike>{item.title}</strike> : item.title}
            </li>
      ))}
        </ul>
      <button
        onClick={() => {
          setTodo();
        }}
      >
        Change Second Todo
      </button>
    </div>
  );
}
