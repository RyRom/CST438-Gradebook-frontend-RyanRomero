import React, { useState } from 'react';
import {SERVER_URL} from '../constants';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddAssignment(props) {

  const [open, setOpen] = useState(false);
  const [assignment, setAssignment] = useState({assignmentName:'', dueDate:'', courseName:'', courseId:''});
  const [message, setMessage] = useState('');

  console.log("AddAssignment props="+props);

  const handleClickOpen = () => {
    setMessage('');
    setAssignment({assignmentName:'', dueDate:'', courseName:'', courseId:''});
    setOpen(true);
  };

  const handleGoHome = () => {
    console.log("handleGoHome");
    props.history.push("/");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAssignment({...assignment,  [event.target.name]:event.target.value})
  }

  const addAssignment = () => {
    console.log("addAssignment "+JSON.stringify(assignment));
    fetch(`${SERVER_URL}/assignment`, 
        {  
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify(
          { 
            assignmentName: assignment.assignmentName,
            dueDate: assignment.dueDate,
            courseName: assignment.courseName,
            courseId: assignment.courseId
          }
        )
        } 
    )
    .then((response) => response.json() )
    .then((data) => {
       if (data) setMessage('Assignment added. ID='+data);
       else setMessage('Assignment not added. ');
    })
    .catch((err) =>  { setMessage('Error. '+err) } );
}

  return (
    <div>
      <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
        New Assignment
      </Button>
      <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleGoHome}>
        Home
      </Button>

      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Assignment</DialogTitle>
          <DialogContent  style={{paddingTop: 20}} >
            <h4>{message}</h4>
            <TextField autoFocus fullWidth label="assignmentName" name="assignmentName" onChange={handleChange}  /> 
            <TextField fullWidth label="courseName" name="courseName" onChange={handleChange}  /> 
            <TextField fullWidth label="dueDate" name="dueDate" onChange={handleChange}  />
            <TextField fullWidth label="courseId" name="courseId" onChange={handleChange}  />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>Close</Button>
            <Button id="Add" color="primary" onClick={addAssignment}>Add Assignment</Button>
          </DialogActions>
        </Dialog>      
    </div>
); 
}

export default AddAssignment;