import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {


  return (
    <div className="App">
     <AddTodo />
     <Todos/>
    
    </div>
  );
}

export default App;
