import TodoChild from "./TodoChild";

export default function Todolist({ todo ,setTodo }) {
  return (
    <>
    <ul>
      {todo.map((item) => (
    <TodoChild key={item.id} item={item} />
      ))}
    </ul>
       <button
       onClick={() => {
         setTodo([
            {
                id: 1,
                title: "Buy a new car",
                completed: false,
              },
              {
                id: 2,
                title: "Buy a new house Update",
                completed: true,
              },
              {
                id: 3,
                title: "Buy a new bike",
                completed: true,
              },
         ] );
       }}
     >
       Change Second Todo
     </button>
    </>
  );
}
