import React, { useState, useCallback } from "react";
import "./Submission.css";
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../../services/Auth.service";
import AuthHeader from "../../../auth/Auth.header";
import axios from "axios";

const API_URL = "http://localhost:8080/api/submission";

function Submission(){

    const navigate = useNavigate();
    const location = useLocation();
    const {assignment} = location.state;
    const [file, setFile] = useState<File | null>(null);
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    const authService = new AuthService();


    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0]; // Only taking the first file
        setFile(selectedFile);
    
        // Generate a preview of the file
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewSrc(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }, []);


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
            alert('Assignment submission successful');

            navigate("/assignments/pending");

        } catch (error) {
            
            console.error('Error submitting the form', error);

            alert('Failed to submit the file');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {}
      });

    return(
        <div className="container">
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the file here ...</p> :
              <p>Drag & drop file here, or click to select file</p>
          }
        </div>
        {previewSrc && (
          <div className="preview">
            <p>Preview:</p>
            <img src={previewSrc} alt="Preview" className="image-preview" />
          </div>
        )}
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    );
}

export default Submission;