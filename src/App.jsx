import { useState } from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import './App.css'

function App() {
  

  return (
    <>
        <h1 className='mb-5'>All About Redux-toolkit</h1>
      <div className='flex flex-col border-2 border-white rounded-lg p-5 justify-center items-center'>
        <AddTodo/>
        <Todos/>
      </div>
    </>
  )
}

export default App
