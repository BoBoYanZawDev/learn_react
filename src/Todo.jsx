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
  let [name,setName] = useState('');
  let toDoCreate = (e) => {
    e.preventDefault();
    setTodo([...todo,{
      id : todo.length + 1,
      title : name,
      completed: false 
    }]) ;
    setName('');
  }
  
  return (
    <div>
        <h1>To Do List</h1>
        <Todolist todo={todo} setTodo={setTodo} toDoCreate={toDoCreate}></Todolist>
        <form action="" onSubmit={toDoCreate}>
      <input type="text" name='name' value={name} onChange={e => setName(e.target.value)}/>
      <button>
        Submit
      </button>
      </form>
    </div>
  );
}
