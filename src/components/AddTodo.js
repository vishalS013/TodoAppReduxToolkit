import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  PostTodosAsync,
  addTodo,
  handleChange,
  toggleModal,
  updateTodo,
} from "../feautures/todo/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

function AddTodo() {
  const show = useSelector((state) => state.isModalOpen);
  const currentTodo = useSelector((state) => state.currentTodo);
  const currentIndex = useSelector((state) => state.currentIndex);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleModal(false));
  const handleShow = () => dispatch(toggleModal(true));



  const addTodoHandler = async(e) => {
    e.preventDefault();
    const { title, description } = currentTodo;

    if (currentIndex !== null) {
      console.log("currentIndex---------->", currentIndex);
      // console.log("ID:", id);
      console.log("title:", title);
      console.log("des:", description);

      dispatch(
        updateTodo(currentTodo),
        handleClose(),
      );
    } else {
      if (title === " " || description === "") {
        alert("all fields are required")
      } else {
        const newTodo = {
          id: nanoid(),
          title,
          description,
          
        };
        console.log("else condition ---==--=-=-=-> in Add Todo Component", newTodo);
        dispatch(addTodo(newTodo));
        try{
          await dispatch(PostTodosAsync(newTodo))
          console.log("TRY  in await  ---==--=-=-=-> in Add Todo Component", dispatch(PostTodosAsync(newTodo)))
        }
        catch(error){
          console.log(error);
        }
      }
      
      
      
    }
    handleClose()
  };
  return (
    <>
      <div className="flex justify-around h-14 bg-slate-700 text-white items-center">
        <h2
          className="w-3/3 "
        ></h2>
        <h2
          className="w-3/3"
        >Add Todo In list</h2>
        <button className="bg-teal-600 w-28 rounded-lg h-10  " onClick={handleShow} > Create New </button>


        <Modal show={show} onHide={handleClose} className="bg-slate-500">
          <Modal.Header closeButton>
            <Modal.Title>Todo </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-lg text-red-600">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentTodo ? currentTodo.title : ""}
                  onChange={(e) =>
                    dispatch(
                      handleChange({ name: "title", value: e.target.value })
                    )
                  }
                  placeholder="Enter title"

                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-lg text-red-600"> Task Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={currentTodo ? currentTodo.description : ""}
                  onChange={(e) =>
                    dispatch(
                      handleChange({ name: "description", value: e.target.value })
                    )
                  }
                  placeholder="Enter description"

                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer >
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={(e) => addTodoHandler(e)}>
             { currentIndex !== null ?  "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    </>
  );
}

export default AddTodo;