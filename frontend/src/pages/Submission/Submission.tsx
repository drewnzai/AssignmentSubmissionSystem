import React, { useState } from "react";
import "./Submission.css";
import { useLocation } from "react-router-dom";
import AuthService from "../../services/Auth.service";
import AuthHeader from "../../auth/Auth.header";
import axios from "axios";

const API_URL = "http://localhost:8080/api/submit";

function Submission(){

    const location = useLocation();
    const {assignment} = location.state;
    const [file, setFile] = useState<File | null>(null);
    const authService = new AuthService();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!file) {
            alert('Please select a file');
            return;
        }

        const user = authService.getCurrentUser();

        const formData = new FormData();
        formData.append('assignmentTitle', assignment.title);
        formData.append('studentRegistration', user.registration);
        formData.append('unitCode', assignment.unitCode);
        formData.append('file', file);

        try{
            const response = await axios.post(API_URL, formData, {headers: AuthHeader()});
            
            console.log(response.data);            
            alert('File submitted successfully');

        } catch (error) {
            
            console.error('Error submitting the form', error);

            alert('Failed to submit the file');
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                File:
                <input type="file" onChange={handleFileChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Submission;