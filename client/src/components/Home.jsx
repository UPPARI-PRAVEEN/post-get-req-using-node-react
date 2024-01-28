import React, { useEffect, useState } from 'react'
import Create from './Create';
import axios from 'axios';

const Home = () => {
  const[todos,setTodos] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  },[])
  return (
    <div>
      <Create />
      {todos.length === 0 ? <h1>No Records Available</h1> : <div>
      {
        todos.map((todo,index)=>(
          <div key={index}>{todo.task}</div>
        ))
      }
        </div>}
    </div>
  )
}

export default Home