import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LecSidebar from "../../../components/Sidebar/LecSidebar";
import LecAssignmentService from "../../../services/LecAssignment.service";
import "./LecAssignments.css";
import {Assignment} from "../../../models/Assignment";
import {toast} from "react-toastify";
import Loader from "../../../components/Loader/Loader";

export default function LecAssignments(){

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const assignmentService = new LecAssignmentService();

    useEffect(
        () => {

            setTimeout(
                () => {
                    assignmentService.getAllAssignments()
                    .then(
                        (response) => {
                            setAssignments(response);
                            setLoading(false);
                        },
                        (error) => {
                            toast.error("No assignments");
                        }
                    )
                }
              , 3000);
            
        }
    ,[]);

    if(loading){
        return(
          <div className="container">
            <Loader/>
          </div>
        );
      }

    return (
        <div>
      <LecSidebar/>
        <div className="assignments-container">
            {assignments.map((assignment, index) => (
                <div key={index} className="assignment-card">
                    <h2>{assignment.title}</h2>
                    <p><strong>Lecturer Email:</strong> {assignment.lecturerEmail}</p>
                    <p><strong>Description:</strong> {assignment.description}</p>
                    <p><strong>Unit Code:</strong> {assignment.unitCode}</p>
                    <p><strong>Due Date:</strong> {assignment.due.toString()}</p>
                </div>
            ))}
        </div>
        </div>
    );

}