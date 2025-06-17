import { useState } from "react";
import Counter from "./Counter.jsx";
import Todo from "./Todo.jsx";
import icon from "./assets/consultant.png"
function App() {

  return (
    <div>
      <img src={icon} alt="" />
      {/* <h1>Hello {name}</h1> */}
      {/* <Counter></Counter> */}
      <Todo></Todo> 
 
    </div>
  )
}

export default App;