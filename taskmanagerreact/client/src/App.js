// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



// import React,{useEffect,useState} from 'react'
// import axios from 'axios';


// const App = () => {
//   const [item,setItem]=useState([]);
//   const [newtask,setNewtask]=useState('');
//   useEffect(() => {
//     axios.get('http://localhost:5000/gettask')
//      .then
//      //(arr => console.log(arr.data))
//      (arr=>setItem(arr.data))
//   },[])
//   const submitHandler = e=>{
//     e.preventDefault();
//     axios.post('http://localhost:5000/addtask',{todo:newtask})
//      .then(arr=>setItem(arr.data))
  
//   }
//   const deleteHandler = id => {
//     axios.delete(`http://localhost:5000/delete/${id}`)
//      .then(arr=>setItem(arr.data))
//   }
//   return (
//     <div>
//       <center>
//         <form onSubmit={submitHandler}>
//           <input type="text" value={newtask} onChange={(e)=>setNewtask(e.target.value)}/>
//           <input type="submit" value="Submit" />  
//         </form>
//         {/* <h2>Hello</h2> */}
//         {item.map(task=>
//           <div key={task._id}>
//             <h3>{task.todo}</h3><button onClick={()=>deleteHandler(task._id)}>Delete</button>
//           </div>)}
//       </center>
//     </div>
//   )
// }

// export default App



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [item, setItem] = useState([]);
  const [newtask, setNewtask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/gettask')
      .then(arr => setItem(arr.data));
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/addtask', { todo: newtask })
      .then(arr => setItem(arr.data));
    setNewtask(''); // Clear the input field after submission
  }

  const deleteHandler = id => {
    axios.delete(`http://localhost:5000/delete/${id}`)
      .then(arr => setItem(arr.data));
  }

  return (
    <div className="container mt-5">
      <center>
        <div className="card w-50 p-4">
          <h2 className="mb-4">Task Manager</h2>
          <form onSubmit={submitHandler} className="d-flex">
            <input 
              type="text" 
              value={newtask} 
              onChange={(e) => setNewtask(e.target.value)} 
              className="form-control me-2" 
              placeholder="Enter new task"
            />
            <input 
              type="submit" 
              value="Submit" 
              className="btn btn-primary" 
            />
          </form>
        </div>

        <div className="mt-5 w-50">
          {item.map(task => (
            <div key={task._id} className="card p-3 mb-3 d-flex flex-row justify-content-between align-items-center">
              <h5 className="m-0">{task.todo}</h5>
              <button onClick={() => deleteHandler(task._id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}

export default App;

