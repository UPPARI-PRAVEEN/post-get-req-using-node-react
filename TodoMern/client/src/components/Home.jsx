import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import './home.css';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
       location.reload()
        // Perform any additional actions if needed
      })
      .catch(err => console.log(err));
  };

  const handleDelete=(id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(result => {
     location.reload()
      // Perform any additional actions if needed
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Create />
      {todos.length === 0 ? <h1>No Records Available</h1> : 
        <div>
          {todos.map((todo, index) => (
            <div key={index}>
              <div onClick={()=>handleEdit(todo._id)}>
              {todo.done === true ? <FaRegCheckCircle />:<FaRegCircle  />}
              </div>
              <div className={todo.done ? 'line-through': ''}>{todo.task}</div>
               <button onClick={()=> handleDelete(todo._id)}>delete</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Home;
