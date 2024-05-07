import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTodo: { id: null, email: "", description: "",   completed:false, },
  currentIndex: null,
  isModalOpen: false,
  todos: [],
}


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)

    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    toggleModal: (state, action) => {
      state.currentIndex = null;
      state.isModalOpen = action.payload;
      state.currentTodo = { title: "", description: "" }


    },
    editTodo: (state, action) => {
      const { index } = action.payload;
      state.currentIndex = index;
      state.currentTodo = state.todos[index];
      state.isModalOpen = true;

    },

    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state.currentTodo = {
        ...state.currentTodo,
        [name]: value,
      };
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;

      console.log(id, title, description, "descriptin")
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          console.log(todo.id === id, "todo.id === id");
          return { ...todo, title, description }
        }
        return todo;
      });
    },

    completeTodo:(state,action)=>{
      const {index} = action.payload
      const todo = state.todos[index]
      console.log("=-=-=-=-=-=-=-=-=>>>>>>>>todo", state.todos[index]);
     if(todo){
      todo.completed = !todo.completed;
      console.log("-=-=->  state.completed ", todo.completed );
     }

    }

  }
})

export const { addTodo, removeTodo, editTodo, toggleModal, updateTodo, handleChange,completeTodo } = todoSlice.actions

export default todoSlice.reducer