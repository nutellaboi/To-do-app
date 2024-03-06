import React, { FormEvent, useState } from 'react';
import './App.css';
import { InputField } from './components/InputField';
import { Todo } from './model/models';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e : React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      setTodo("");
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo = {todo} setTodo = {setTodo} handleAdd = {handleAdd} />
    </div>
  );
}

export default App;