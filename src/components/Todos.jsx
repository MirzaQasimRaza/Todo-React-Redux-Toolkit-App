import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editTodo, removeTodo } from '../features/todoSlice';

function Todos() {

    const todos = useSelector((state)=> state.todos); // useSelector will automatically be re-render after state update after deleting
    const dispatch = useDispatch();

    const [editingId,setEditingId] = useState(null);
    const [editText,setEditText] = useState("");

    const handleSave = (id) =>{
      if(editText === "") return;
      dispatch(editTodo({id, newText: editText}));
      setEditingId(null);
      setEditText("");
    }

  return (
    <>
    {todos.map((todo) => (
        <div key={todo.id} className="flex justify-between items-center gap-8 w-full bg-gray-800 mb-5 pl-5 rounded-lg p-2">
          {editingId === todo.id ? (
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
                    setEditingId(todo.id);
                    setEditText(todo.text);
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