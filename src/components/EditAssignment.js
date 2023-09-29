import React, { useState, useEffect } from 'react';
import {SERVER_URL} from '../constants';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditAssignment(props) { 

  const [open, setOpen] = useState(true);
  const path = window.location.pathname;
  const s = /\d+$/.exec(path)[0];
  const [assignment, setAssignment] = useState({assignmentName:'', dueDate:'', courseName:'', courseId:''});
  const [message, setMessage] = useState('');

  console.log("EditAssignment props="+props);

  useEffect(() => {
    // called once after intial render
    fetchAssignment();
  }, [] )

  const fetchAssignment = () => {
    fetch(`${SERVER_URL}/assignment/${s}`)
    .then((response) => response.json() )
    .then((data) => {
       if (data) {
         console.log("assignment id "+data.id);
         setAssignment(data);
       }
       else setMessage('Assignment not found. ');
    })

    setMessage('');
    // populate the form with the assignment data
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("handleGoHome");
    props.history.push("/");
  };

  const handleChange = (event) => {
    setAssignment({...assignment,  [event.target.name]:event.target.value})
  }

  const editAssignment = () => {
    console.log("editAssignment "+JSON.stringify(assignment));
    fetch(`${SERVER_URL}/assignment/${s}`, 
        {  
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify(
          { 
            assignmentName: assignment.assignmentName,
            dueDate: assignment.dueDate,
          }
        )
        } 
    )
    .then((response) => response.json() )
    .then((data) => {
       if (data) setMessage('Assignment edited. ID='+data);
       else setMessage('Assignment not edited. ');
    })
    .catch((err) =>  { setMessage('Assignment edited.') } );
}

  return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Assignment</DialogTitle>
          <DialogContent  style={{paddingTop: 20}} >
            <h4>{message}</h4>
            <TextField autoFocus fullWidth label="assignmentName" name="assignmentName" onChange={handleChange}  /> 
            <TextField fullWidth label="dueDate" name="dueDate" onChange={handleChange}  />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>Close</Button>
            <Button id="Add" color="primary" onClick={editAssignment}>Edit Assignment</Button>
          </DialogActions>
        </Dialog>
      </div>
  ); 
}

export default EditAssignment;