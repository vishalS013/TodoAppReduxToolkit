import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

// initially taking loading and error to display lodaer or error
const initialState = {
  currentTodo: { id: null, email: "", description: "", completed: false, },
  currentIndex: null,
  isModalOpen: false,
  todos: [],
  loading: false,
  error: null,
}
// todo/fetchTodo it can be any name just because not to conflict with same name we have add todo/

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async () => {
  try {
    console.log('Fetching todos...');
    const response = await axios.get("http://localhost:4000/posts")
    console.log('Fetched todos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw Error("Failed todo");
  }
});

// posting data in ui via Todos component
export const PostTodosAsync = createAsyncThunk('todo/PostTodosAsync', async (newTodo) => {
  try {
    const response = await axios.post("http://localhost:4000/posts", newTodo)
    return response.data
  } catch (error) {
    throw Error(error.response.data.message);
  }
});


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

    completeTodo: (state, action) => {
      const { index } = action.payload
      const todo = state.todos[index]
      console.log("=-=-=-=-=-=-=-=-=>>>>>>>> todo", state.todos[index]);
      if (todo) {
        todo.completed = !todo.completed;
        console.log("-=-=->  state.completed ", todo.completed);
      }

    },

  },


  //Creating extra reducers or PostAsyncData

  extraReducers: (builder) => {
    builder
      .addCase(PostTodosAsync.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
        console.log("-=---=-=-> pending working");

      })
      .addCase(PostTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        console.log("-=---=-=-> Fulfilled working", state.todos);

      })
      .addCase(PostTodosAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        console.log("-=---=-=-> Error working");
      })


    // For fetchTodo Method Need to create for deletion 
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.loading = true
      state.error = undefined
      console.log("-=---=-=-> pending working");
    })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        console.log("-=---=-=-> error working");
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        state.todos = action.payload
        console.log("-=---=-=-> action.payload working", action.payload);
      })
  },

})

export const { addTodo, removeTodo, editTodo, toggleModal, updateTodo, handleChange, completeTodo } = todoSlice.actions

export default todoSlice.reducer