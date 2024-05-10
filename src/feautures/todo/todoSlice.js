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
export const AddTodos = createAsyncThunk('todo/post', async (newTodo) => {
  try {
    const response = await axios.post("http://localhost:4000/posts", newTodo)
    return response.data
  } catch (error) {
    throw Error(error.response.data.message);
  }
});


//updateTodo we also need to call this in our Todo component
export const updateTodo = createAsyncThunk('todo/update', async (currentTodo) => {
  try {
    const response = await axios.put(`http://localhost:4000/posts/${currentTodo.id}`, currentTodo)
    return response.data
  } catch (error) {
    throw Error(error.response.data.message);
  }
});


// For deleting data and we are using this in Todos.js on delete button to get id -=-=-=-=-=>
export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
  try {
    await axios.delete(`http://localhost:4000/posts/${id}`)
    return id
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
    
    // removeTodo: (state, action) => {
    //   state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    // },

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

    // now we already updating via extra reducer no need to add this reducer

    // updateTodo: (state, action) => {
    //   const { id, title, description } = action.payload;

    //   console.log(id, title, description, "descriptin")
    //   state.todos = state.todos.map((todo) => {
    //     if (todo.id === id) {
    //       console.log(todo.id === id, "todo.id === id");
    //       return { ...todo, title, description }
    //     }
    //     return todo;
    //   });
    // },

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


    //fotr adding todos in list we need ta call on AddTodos this  reduceer method 
    builder
      .addCase(AddTodos.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
        console.log("-=---=-=-> pending working");

      })
      .addCase(AddTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [...state.todos, action.payload]
        console.log("-=---=-=-> Fulfilled working", state.todos);

      })
      .addCase(AddTodos.rejected, (state, action) => {
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


    //Updating todo in Api Pending and rejected add case will remain same 
    builder.addCase(updateTodo.pending, (state, action) => {
      state.loading = true
      state.error = undefined
      console.log("-=---=-=-> pending working");
    })

      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        console.log("-=---=-=-> error working");
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false
        state.error = undefined
        const { id, title, description } = action.payload;

        console.log(id, title, description, "descriptin")
        state.todos = state.todos.map((todo) => {
          if (todo.id === id) {
            console.log(todo.id === id, "todo.id === id");
            //first way 

            // return { ...todo, title, description }

            //second way
            todo.title = title;
            todo.description = description;

          }
          return todo;
        })
      })

    // for deleting case

    builder.addCase(deleteTodo.pending, (state, action) => {
      state.loading = true
      state.error = undefined
      console.log("-=---=-=-> pending working");
    })

      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        console.log("-=---=-=-> error working");
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)

      })
  },

})

export const { addTodo, removeTodo, editTodo, toggleModal, handleChange, completeTodo } = todoSlice.actions

export default todoSlice.reducer  