import React, { useEffect } from 'react'
//need to import this
import { useSelector, useDispatch } from 'react-redux'

// calling fetchTodo here
import { removeTodo, editTodo, completeTodo, fetchTodo, deleteTodo } from '../feautures/todo/todoSlice'
import Spinner from 'react-bootstrap/Spinner';


function Todos() {
  //dispatching current action to store
  const dispatch = useDispatch()

  //Getting All the Keys and values in Todo Array so tabhi map krwa pa rhe hum UI mai iske through-=-=-=-=-=-=->
  const todos = useSelector(state => state.todos)

  //getting values of object keys via using useSelector
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const handleEdit = (index) => {
    dispatch(editTodo({ index }))
    console.log("handle edit in TODOS", index);

  }

  // so that initially this will work
  useEffect(() => {
    dispatch(fetchTodo())
  }, [])


  //For showing spinner in UI
  if (loading) {
    return <>
      <Spinner animation="border" role="status">
        <span className="visually-hidden mx-16">Loading...</span>
      </Spinner>
    </>
  }
  //Error message in UI
  if (error) {
    return <>{error}</>
  }

  return (
    <>
      <div className=' bg-slate-600'>
        <table className="table-auto w-full text-base bg-white border-none text-center border-gray-300">
          <thead className=" text-black">
            <tr>
              <th className="border-b-2 border-gray-300  px-4 py-2">Sr.No.</th>
              <th className="border-b-2 border-gray-300px-4 py-2 w-1/3">Title</th>
              <th className="border-b-2 border-gray-300  px-4 py-2  w-1/3">
                Description
              </th>

              <th className="border-b-2 border-gray-300 px-4 py-2  w-1/3 ">Actions</th>
            </tr>
          </thead>
          {todos.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 font-bold text-3xl"
                >
                  No Todos Found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>

              {/*-=-=-=-=-=-=>  */}
              {todos.map((todo, index) => (
                <tr
                  key={todo.id}
                  className={`hover:bg-gray-100 ${todo.completed ? "line-through" : ""
                    }`}
                >
                  <td className="border-b-2 border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-gray-300 px-4 py-2  w-1/3 break-all">
                    {todo.title}
                  </td>

                  <td className="border-b-2 border-gray-300 px-4 py-2  w-1/3 break-all">
                    {todo.description}
                  </td>
                  <td className="border-b-2 border-gray-300 px-4 py-2">
                    {
                      !todo.completed && (
                        <>
                          <button
                            className="text-white bg-yellow-500 border-b-2 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md mr-5 w-28"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md mr-5 w-28"
                            onClick={() => dispatch(deleteTodo(todo.id))}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    <button
                      className={`text-white py-1 px-4 focus:outline-none rounded text-md w-28 ${todo.completed
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-green-700 hover:bg-blue-600"
                        }`}
                      onClick={() => dispatch(completeTodo({ index }))}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>



    </>
  )
}

export default Todos