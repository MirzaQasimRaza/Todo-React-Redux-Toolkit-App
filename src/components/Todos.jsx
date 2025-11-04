import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo } from '../features/todoSlice';

function Todos() {

    const todos = useSelector((state)=> state.todos);
    const dispatch = useDispatch();

  return (
    <>
    {todos.map((todo)=>(
        <div key={todo.id} className='flex justify-between items-center gap-8 w-full bg-gray-800 mb-5 pl-5 rounded-lg'>
            {todo.text}
            <button onClick={()=> dispatch(removeTodo(todo.id))} className='bg-red-500 text-white'>
                Delete
            </button>
        </div>
    ))}
    </>
  )
}

export default Todos