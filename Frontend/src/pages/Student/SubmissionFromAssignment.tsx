import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Assignment } from "../../models/Assignment";
import StudentService from "../../services/Student.service";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Sidebar from "../../components/Student/Sidebar";
import Topbar from "../../components/Admin/Topbar";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";

export default function SubmissionFromAssignment(){
    
    const location = useLocation();
    const assignment: Assignment = location.state;

    const navigate = useNavigate();
    
    const service = new StudentService();

    const registration = service.getCurrentUserRegistration();

    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 1) {
          alert('Only one file is allowed. If submitting multiple files, compress them into one zip or rar file');
          return;
        }
        setFile(acceptedFiles[0]);
      }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
    });
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!file) {
          alert('Please select a file to upload.');
          return;
        }
    
        window.confirm("Are you sure? This is a irreversible action");

        const formData = new FormData();
        formData.append('assignmentTitle', assignment.title);
        formData.append('studentRegistration', registration);
        formData.append('unitCode', assignment.unitCode);
        formData.append('file', file);

        service.submitAssignment(formData)
        .then(
            (_response) => {
              toast.success("Submitted Assignment Succesfully");
              navigate("/student/home");
            }
        )
    }
    
    return(
        <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
            <Header title="Submission Page" subtitle="Submit the Assignment"/>
            <form onSubmit={handleSubmit}>
            <Box 
            m="15px" 
            display="block"
            alignItems={"center"}
            justifyContent="center"
           >
            <Box m="20px"
            ml="450px">
            <Typography variant="h2">
                {assignment.title}
            </Typography>

            <Typography variant="h3">
                {assignment.description}
            </Typography>
            </Box>

            {file? (
            
            <Box ml={70}
            >
                <Typography variant="h3" sx={{
                    color: "red"
                }}> Selected File: {file.name}</Typography>
            </Box>
            
            )
        
        : ( <Box
            {...getRootProps()}
            border="1px dashed grey"
            p={2}
            height="200px"
            alignItems={"center"}
            justifyContent={"center"}
            textAlign="center"
            mt={2}
            >

        
                
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the file here ...</Typography>
          ) : (
            <Typography>Drag 'n' drop a file here, or click to select one</Typography>
          )}
          <Typography variant="caption">Only one file is allowed. 
          If submitting multiple files, compress them into one zip or rar file</Typography>
        </Box>)
    }
           
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2,
            backgroundColor: "red"
         }}>
          Submit
        </Button>

        </Box>
        </form>
        </main>
        </div>
    );
}