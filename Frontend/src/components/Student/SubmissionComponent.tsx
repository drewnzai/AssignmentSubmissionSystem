import {Submission} from "../../models/Submission";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export default function SubmissionComponent({submission}: {submission: Submission}){
 
    return( 
    <Box 
    display="flex" 
    flexDirection="column" 
    p={2} 
    m={1} 
    border={1} 
    borderRadius={4}>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{submission.assignmentTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6">Feedback: {submission.feedback}</Typography>
            <Typography variant="h6">Score: {submission.score}</Typography>
            <Typography variant="h6">Accepted: {submission.accepted ? 'Yes' : 'No'}</Typography>
          </AccordionDetails>
        </Accordion>
         
  </Box>);

}