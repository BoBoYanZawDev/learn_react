import { useState } from "react";
import Todolist from "./components/todolist";
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
        <Todolist todo={todo} setTodo={setTodo}></Todolist>
    </div>
  );
}
