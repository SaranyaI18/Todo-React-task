import React, { useState, useEffect } from "react";
import Item from "./Common";
import styled from 'styled-components';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (localStorage.items) {
      setTodos(JSON.parse(localStorage.getItem("items")));
    } else {
      setTodos([]);
    }
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo === "") {
      return;
    }
    let todoObject = {
      id: todos.length + 1,
      task: todo,
      completed: false,
    };
    localStorage.setItem("items", JSON.stringify([...todos, todoObject]));
    setTodos([...todos, todoObject]);
    setTodo("");
  };

  const completedTodo = (index) => {
    const newList = todos.map((list) => {
      if (list.id === index) {
        list.completed = !list.completed;
      }

      return list;
    });
    localStorage.setItem("items", JSON.stringify(newList));
    setTodos(newList);
  };

  return (
    <div className="mn">
      <Title>ToDo List</Title>
      <div className="mn1">
        <H3>ADD ITEM</H3>
        <hr/>
        <div className="todo-form">
          <form onSubmit={handleSubmit}>
            <label>
             
              <Input
                type="text"
                value={todo}
                name="todo"
                onChange={handleChange}
              />
            </label>
            <Button type="submit">ADD</Button>
          </form>
        </div>
        <div>
          {todos.length > 0 ? (
            <div >
              <H3>TODO</H3>
              <hr/>

              <ul style={{fontSize: '20px'}}>
              {todos.map((todoItem) => {
                if(todoItem.completed === false) { 
                  return (
                    <Item
                      todoItem={todoItem}
                      completedTodo={completedTodo}
                      setTodos={setTodos}
                      todos={todos}
                      key={todoItem.id}
                    />
                  );
                }           
              })}
              </ul>

            </div>
          ) : (
            <div>You have no todos</div>
          )}
        </div>

          <div>
          {todos.length > 0 ? (
            <div>
              <H3>COMPLETED</H3>
              <hr/>

              <ul style={{fontSize: '20px'}}>
              {todos.map((todoItem) => {
                if(todoItem.completed === true) { 
                  return (
                    <Item
                      todoItem={todoItem}
                      completedTodo={completedTodo}
                      setTodos={setTodos}
                      todos={todos}
                      key={todoItem.id}
                    />
                  );
                }           
              })}
              </ul>
            </div>
          ) : (
          ""
          )}
        </div>   
      </div>
    </div>
  );
};

export default Todo;

const H3 = styled.h3`
  font-size: 15px;
  margin-left: 1px;
`;

const Input = styled.input`
    margin-top: 20px;
    width: 320px;
    height: 30px;
    border-radius: 8px;
    font-family: sans-serif;
    font-size: 15px;
`;

const Button = styled.button`
    display: inline;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-family: sans-serif;
    background-color: white;
    color: grey;
    font-weight: bold;
    margin-left: 10px;
  `;

const Title = styled.h1`
  margin-left: 50px;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: -10px;

`;