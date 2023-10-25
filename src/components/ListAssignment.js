import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function ListAssignment(props) {

    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState('');

    const token = sessionStorage.getItem("jwt");

    // const f1 = () => { fetchAssignments(); }
    // useEffect(f1, []);

    // useEffect(fetchAssignments, [])
    // useEffect(() => fetchAssignments(), []) - passes results of fetchAssignments to useEffect

    useEffect(() => {
    // called once after intial render
    fetchAssignments();
    }, [] )
  
    const fetchAssignments = () => {
      console.log("fetchAssignments");
      fetch(`${SERVER_URL}/assignment`, {
        headers: { 'Authorization': token }
      }
      )
      .then((response) => response.json() ) 
      .then((data) => { 
        console.log("assignment length "+data.length);
        setAssignments(data);
      }) 
      .catch(err => console.error(err)); 
    }

    const handleDelete = (idx) => {
      console.log("handleDelete "+idx);
      fetch(`${SERVER_URL}/assignment/${idx}`,
        { method: 'DELETE',
          headers: { 'Authorization': token }
        })
      .then(res => {
          if (res.ok) {
            fetchAssignments();
            setMessage("Assignment deleted.");
          } else {
            setMessage("Delete error. "+res.status);
            console.error('Delete error =' + res.status);
      }
      })
      .catch(err => console.error(err));
    }

    const handleForceDelete = (idx) => {
      console.log("handleForceDelete "+idx);
      fetch(`${SERVER_URL}/assignment/${idx}/?force=yes`,
        { method: 'DELETE',
          headers: { 'Authorization': token }})
      .then(res => {
          if (res.ok) {
            fetchAssignments();
            setMessage("Assignment deleted.");
          } else {
            setMessage("Delete error. "+res.status);
            console.error('Delete error =' + res.status);
      }
      })
      .catch(err => console.error(err));
    }
  
    const headers = ['ID', 'Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.id}</td>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td>
                        <Link id="editButton" to={`/editAssignment/${row.id}`} >Edit</Link>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(row.id)}>Delete</button>
                      </td>
                      <td>
                        <button id="forceDelete" onClick={() => handleForceDelete(row.id)}>Force Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          <div>
            <br/>
            <Link id="addButton" to={`/addAssignment`} >Add Assignment</Link>
          </div>
      </div>
    )
}  

export default ListAssignment;