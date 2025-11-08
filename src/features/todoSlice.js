import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [] // made it empty so that everytime the component re-renders, the same Hello World with id,1 doesn't add in the todo tasks.
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state,action)=>{
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo);
        },

        removeTodo: (state,action)=>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload);
        },

        editTodo: (state,action)=>{
            const {id, newText} = action.payload; // yahan newText basically todos ki text property ko replace kardega
            const todo = state.todos.find((todo)=> todo.id === id);
            if(todo){
                todo.text = newText; // update Text
            }
        }
    }
})

export const {addTodo,removeTodo,editTodo} = todoSlice.actions;

export default todoSlice.reducer;

// Dispatch → Store → Big Reducer → Small Reducer → Updated Store → Components Re-render
