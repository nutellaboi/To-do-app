import React, { FormEvent, useState } from 'react';
import './App.css';
import { InputField } from './components/InputField';
import { Todo } from './model/models';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e : React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;

    console.log(result);//check console for source and destination information

    if(!destination) return;
    
    if(destination.droppableId === source.droppableId && destination.index == source.index) return;

    let add,
    active = todos,
    complete = completedTodos;

    if(source.droppableId === 'TodosList'){
      add = todos[source.index];
      todos.splice(source.index, 1);
    } else{
      add = completedTodos[source.index];
      completedTodos.splice(source.index, 1);
    }

    if(destination.droppableId === 'TodosList'){
      active.splice(destination.index, 0, add);
    } else{
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo = {todo} setTodo = {setTodo} handleAdd = {handleAdd} />
        <TodoList 
          todos = {todos}
          setTodos = {setTodos}
          completedTodos = {completedTodos}
          setCompletedTodos = {setCompletedTodos}/>
      </div>
    </DragDropContext>
  );
}

export default App;
