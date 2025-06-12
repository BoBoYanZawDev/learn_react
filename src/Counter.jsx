import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const addCount = () =>{
    setCount(count + 1)
  }
  const minusCount = () =>{
    if(count > 0){
        setCount(count - 1)
    }else{
        alert("Count cannot be negative")
    }
  }
  return (
    <div>
      <h1>Count - {count}</h1>
      <button onClick={addCount} style={{backgroundColor: 'blue', color: 'white', padding: '10px 20px',margin: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer'}}>Increment</button>
      <button onClick={minusCount} style={{backgroundColor: 'blue', color: 'white', padding: '10px 20px',margin: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer'}}>Decrement</button>
    </div>
  )
}

export default Counter
