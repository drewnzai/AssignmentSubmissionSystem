import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import LecturerService from "../../services/Lecturer.service";

export default function DeleteAssignment(){

    const service = new LecturerService();

    const [title, setTitle] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
      };

    const handleButtonClick = () => {
    service.deleteAssignment(title);
    };

    return(
        <Box m="10px">
            <TextField
            fullWidth
            variant="filled"
            type="text"
            value={title}
            onChange={handleInputChange}
            label="Assignment Name"
            />
            <br/>
            <br/>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "red"
        }} 
          onClick={handleButtonClick}
        >
          Delete Assignment
        </Button>
        </Box>
    );
}