import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, editTodo, removeTodo } from '../features/todoSlice';

function Todos() {

    const todos = useSelector((state)=> state.todos); // useSelector will automatically be re-render after state update after deleting
    const dispatch = useDispatch();

    const [editingId,setEditingId] = useState(null); // iska matlab hai koi todo edit nahi hai. Phir jab koi editing hogi tou yahan id ajaye gi useState mein todo ki phir woh edit id sey edit phir ? : wali condition dekhega
    const [editText,setEditText] = useState("");

    const handleSave = (id) =>{
      if(editText === "") return;
      dispatch(editTodo({id: id, newText: editText}));
      setEditingId(null);
      setEditText("");
    }

    useEffect(()=>{
      const savedTodos = JSON.parse(localStorage.getItem("todos"));
      if(savedTodos && savedTodos.length > 0){
        savedTodos.forEach((todo)=> dispatch(addTodo(todo.text))) // here we are getting text from each addTodo reducer function from createSlice (ultimately from initialState)
      }
    },[dispatch])

    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos)); // setting the todos from json object to string form for saving it inside the localStorage
    },[todos])

  return (
    <>
    {todos.map((todo) => (
        <div key={todo.id} className="flex justify-between items-center gap-8 w-full bg-gray-800 mb-5 pl-5 rounded-lg p-2">
          {editingId === todo.id ? ( // checking if editingId jo useState ki hai uski id kya todos jokay redux store mein save hai (createSlice mein) uusay match horhi hai? if yes tou edit kardo warna na karo
            // ✅ Edit mode
            <div className="flex w-full gap-3">
              <input
                type="text"
                className="flex-1 bg-white text-black rounded-lg text-center"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                onClick={() => handleSave(todo.id)}
                className="bg-green-500 text-white px-3 rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditText("");
                }}
                className="bg-gray-500 text-white px-3 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            // 🧾 Normal mode
            <>
              <span>{todo.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    /* 
                    Logically 2 re-renders hone chahiye,
                    lekin React smart hai — woh dono setState calls ko ek batch bana deta hai,
                    aur component ko sirf ek hi baar re-render karta hai baad mein.
                    This process is called "Automatic Batching" introduced in React 18
                    */
                    
                    setEditingId(todo.id); // yeh editingId mein todo ki id ko bhej dega phir component re-render hoga phir  : ? wali condition check hogi
                    setEditText(todo.text); // yeh khe rha hai jab edit click karo toh todos mein jo bhi text store ho usko select karlena aur upar jo span hai usmein put kardena
                     // yeh dono callback re-render kareingy component ko yani state ko change kardeingy jiski waja say ? : wali condition dobara check hogi
                  }}
                  className="bg-yellow-500 text-white px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default Todos