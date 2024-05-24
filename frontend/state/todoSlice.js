import { createSlice } from "@reduxjs/toolkit";

let id = 1
const getNextId = () => id++

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [ 
        { id: getNextId(), label: 'Laundry', complete: true },
        { id: getNextId(), label: 'Groceries', complete: false },
        { id: getNextId(), label: 'Dishes', complete: false },
      ],
        showCompletedTodos: false
    },
    reducers: {
        toggleShowCompletedTodos: state => {
            // thanks to Immer https://immerjs.github.io/immer/
            // we can mutate the state directly
            state.showCompletedTodos =  !state.showCompletedTodos
        },
        toggleTodo: (state, action) => {
            let todo = state.todos.find(td => td.id === action.payload)
            todo.complete = !todo.complete
        },
        createNewTodo: {
            prepare(label, complete) {
                return { payload: { id: getNextId(), label, complete}}
            },
            reducer(state, action) {
                state.todos.push(action.payload)
            }
        }
    }
})

export const {
    createNewTodo,
    toggleTodo,
    toggleShowCompletedTodos
} = todoSlice.actions

export default todoSlice.reducer