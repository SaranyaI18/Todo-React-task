import React, { useState } from "react";
import styled from 'styled-components';

const Item = ({ todoItem, completedTodo, setTodos, todos }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(todoItem.task);
 
  const handleEditChange = (e) => {
    setTodo(e.target.value);
  };
  
  function handleDelete(id) {
    const deletedList =  todos.filter (todo => todo.id !== id);
    localStorage.setItem("items", JSON.stringify(deletedList));
    setTodos(JSON.parse(localStorage.getItem("items")));
    return setTodos(deletedList); 
  }

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleEditSubmit = (id) => {
    const editedList = todos.map((oneTodo) => {
      if (oneTodo.id === id) {
        oneTodo.task = todo;
      }
      return oneTodo;
    });
    localStorage.setItem("items", JSON.stringify(editedList)); 
    setTodos(editedList);
    handleEdit();
  };
  return (
    <div className="todo" key={todoItem.id}>
      {!edit  &&  todoItem.completed === false ? (
        <div>
        
          <input
            type="checkbox"
            checked={todoItem.completed}
            onChange={() => completedTodo(todoItem.id)}
          />
          <span>{todoItem.task}</span>
          
          <Button onClick={handleEdit} >
            Edit
          </Button>

          <Button1 onClick={() => handleDelete(todoItem.id)}>
            Delete
          </Button1>      
        </div>
      ) : !edit  &&  todoItem.completed === true ?(
        <div>
        
          <input
            type="checkbox"
            checked={todoItem.completed}
            onChange={() => completedTodo(todoItem.id)}
          />
          <span style={{ textDecoration:'line-through' }}>{todoItem.task}</span>
          
          <Button onClick={handleEdit} >
            Edit
          </Button>   

          <Button1 onClick={() => handleDelete(todoItem.id)}>
            Delete
          </Button1>   
        </div>
      )
      
      
      
      
      
      
      :(
        <div>
          <input
            type="text"
            value={todo}
            name="todo"
            onChange={handleEditChange}
          />
         
          <Button type="submit" onClick={() => handleEditSubmit(todoItem.id)}>
            Save
          </Button>

          <Button1 onClick={() => handleDelete(todoItem.id)}>
            Delete
        </Button1>
        </div>
      )}
    </div>
  );
};

export default Item;

const Button = styled.button`
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-family: sans-serif;
    background-color: white;
    margin-left: 140px;
    font-weight: bold;
    color: grey;
  `;

  const Button1 = styled.button`
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-family: sans-serif;
  background-color: white;
  margin-left: 10px;
  font-weight: bold;
  color: grey;
`;
