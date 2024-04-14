import React from "react";
import "./Submission.css";
import { useLocation } from "react-router-dom";

function Submission(){

    const location = useLocation();
    const {assignment} = location.state;

    return(
        <div>
            <p>{assignment.title}</p>
            <p>{assignment.description}</p>
        </div>
    );
}

export default Submission;