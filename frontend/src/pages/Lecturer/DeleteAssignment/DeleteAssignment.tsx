import React, {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DeleteAssignment.css';
import LecAssignmentService from '../../../services/Lecturer/LecAssignment.service';
import {useNavigate} from 'react-router-dom';
import {MiscRequest} from '../../../models/MiscRequest';
import LecSidebar from '../../../components/Sidebar/LecSidebar';

const DeleteAssignment = () => {
  const [assignmentTitle, setAssignmentTitle] = useState('');

  const navigate = useNavigate();

  const assignmentService = new LecAssignmentService();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssignmentTitle(event.target.value);
  };

  const handleDelete = async () => {
    if (!assignmentTitle.trim()) {
      toast.error('Please enter a valid assignment title.');
      return;
    }

    const miscRequest: MiscRequest = {
        data: assignmentTitle
    }

    if (window.confirm(`Are you sure you want to delete the assignment titled "${assignmentTitle}"?`)) {

    assignmentService.deleteAssignment(miscRequest)
    .then(
        () => {
            toast.success("Assignment deleted successfully");
            setAssignmentTitle("");
        },
        (error) => {
            toast.error("No such assignment exists");
            
        }
      
);

    }

  };

  return (
    <div style={{display: "flex"}}>
      <LecSidebar/>
    <div className="delete-assignment-container">
      <input
        type="text"
        placeholder="Enter Assignment Title"
        value={assignmentTitle}
        onChange={handleInputChange}
        className="delete-input"
      />
      <button onClick={handleDelete} className="delete-button">Delete</button>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
    </div>
  );
};

export default DeleteAssignment;
