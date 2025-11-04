import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { addTodo } from '../features/todoSlice';

function AddTodo() {

    const [todo,setTodo] = useState("");
    const dispatch = useDispatch();

    const todoHandler = (e) =>{
        e.preventDefault();
        dispatch(addTodo(todo));
        setTodo("")
    }

  return (
    <>
    <form onSubmit={todoHandler} className='flex gap-8 mt-5 mb-5'>
        <input 
        type="text"
        className='bg-white text-black font-sans rounded-lg text-center'
        placeholder='Enter todo...'
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
        />
        <button type='submit' className='bg-blue-500 text-white'>
            Add Todo
        </button>
    </form>
    </>
  )
}

export default AddTodo