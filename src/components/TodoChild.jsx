import React from 'react'

export default function TodoChild({item}) {
  return (
    <li >
    {item.completed ? <strike>{item.title}</strike> : item.title}
     </li>
  )
}
