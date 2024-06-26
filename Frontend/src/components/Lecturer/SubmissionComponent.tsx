import {useState} from "react";
import {Submission} from "../../models/Submission";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LecturerService from "../../services/Lecturer.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function SubmissionComponent({submission}: {submission: Submission}){
    const [currentSubmission, setCurrentSubmission] = useState<Submission>(submission);

    const service = new LecturerService();

    const navigate = useNavigate();

    const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSubmission({
          ...currentSubmission,
          feedback: event.target.value,
        });
      };
    
      const handleAcceptedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentSubmission({
          ...currentSubmission,
          accepted: event.target.checked,
        });
      };
    
      const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
          setCurrentSubmission({
            ...currentSubmission,
            score: value,
          });
        }
      };

      const handleDownloadClick = () => {
        service.getSubmissionFile(currentSubmission.path);
      }

      const handleUpdateClick = () => {
        window.confirm("Are you sure? This action is irreversible");
        
        service.updateSubmission(currentSubmission)
        .then(
          (_response) => {
            toast.success("Marked Submission");
            navigate("/lecturer/home");
          }
        )
      }

    return( 
    <Box 
    display="flex" 
    flexDirection="column" 
    p={2} 
    
    >
        
        {submission.feedback.length > 0 ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{currentSubmission.studentRegistration}</Typography>
            &nbsp;
            &nbsp;
            &nbsp;
            <Typography variant="h6"> {currentSubmission.assignmentTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6">Feedback: {currentSubmission.feedback}</Typography>
            <Typography variant="h6">Score: {currentSubmission.score}</Typography>
            <Typography variant="h6">Accepted: {currentSubmission.accepted ? 'Yes' : 'No'}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
    <Typography variant="h6"> From {currentSubmission.studentRegistration}</Typography>
    <TextField
      label="Feedback"
      value={currentSubmission.feedback}
      onChange={handleFeedbackChange}
      multiline
      rows={4}
      fullWidth
      margin="normal"
    />
    
    <IconButton onClick={handleDownloadClick} aria-label="download">
        <DownloadIcon />
    </IconButton>
    
    <TextField
      label="Score"
      type="number"
      value={currentSubmission.score}
      onChange={handleScoreChange}
      fullWidth
      margin="normal"
      inputProps={{ min: 0 }}
    />
    <Box display="flex" alignItems="center" mt={2}>
      <Checkbox
        checked={currentSubmission.accepted}
        onChange={handleAcceptedChange}
      />
      <Typography>Accepted</Typography>
    </Box>
    <Button variant="contained" onClick={handleUpdateClick} sx={{ mt: 2 }}>
      Update
    </Button>
        </>
      )}
    
  </Box>);

}