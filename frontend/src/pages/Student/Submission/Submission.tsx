import React, {useCallback, useState} from "react";
import "./Submission.css";
import {useDropzone} from 'react-dropzone';
import {useLocation, useNavigate} from "react-router-dom";
import AuthService from "../../../services/Student/Auth.service";
import AuthHeader from "../../../auth/Auth.header";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/submission";

function Submission(){

    const navigate = useNavigate();
    const location = useLocation();
    const {assignment} = location.state;
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
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

            setLoading(true);
            
            await axios.post(API_URL, formData, {headers: AuthHeader()});
            
            setLoading(false);

            alert('Assignment submission successful');

            navigate("/home");

        } catch (error) {
            
            toast.error("File submission failed");

        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {}
      });


    if(loading){
        return(
          <div className="loader-container">
            <Loader/>
          </div>
        );
      }

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
            <p>File Name: {file?.name}</p>
          </div>
        )}
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    );
}

export default Submission;