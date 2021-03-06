import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
//for UI design: https://material-ui.com/getting-started/usage/

// this component will keep track of our task state through a form

const TaskForm = ({getTask}) => {
  // define state to keep track of input from user
  const [task, setTask] = useState({
    title: '', 
    date: '', 
  }); 

  const history = useHistory();

  // function that will handle task input change
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target
    setTask({
      ...task,
      [name]: value // using computed property names to update respective fields when user types in that input text
    });
  };

  // func that will handle submit from user
  const taskForm = (e) => {
    e.preventDefault();
        const token = localStorage.getItem('tokenStore');
        setTask({
          ...task
        });

    const { title, date } = task;
    const newTask = { title, date };

    axios.post('/api/tasks', newTask, {
        headers: {Authorization: token}
      })
      .then(res => {
        getTask(token);

      })
      .catch(err => {
        console.log(err);
      });

    //reset the input boxes 
     setTask({
        title: '',
        date: '',
      });
 };

//asd
  return (
    <form onSubmit={taskForm} className="task-form">
      <TextField 
        variant="outlined"
        margin="normal"
        name='title'
        value={task.title}
        placeholder='Task'
        required
        onChange={handleTaskInputChange}
      />
     
     <TextField 
        variant="outlined"
        margin="normal"
        name='date'
        value={task.date}
        placeholder='Date'
        onChange={handleTaskInputChange}
     />
      <button id="task-button" type='submit'>Add</button>
    </form>
  );
}

export default TaskForm;
