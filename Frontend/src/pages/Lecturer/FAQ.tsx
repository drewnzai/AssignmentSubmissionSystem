import {useTheme} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/Header";
import Sidebar from "../../components/Lecturer/Sidebar";
import {tokens} from "../../theme";
import Topbar from "../../components/Topbar";

export default function LecturerFAQ(){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <div className="app">
            <Sidebar/>
        <main className="content">
            <Topbar/>
            <Header title="FAQ" subtitle="Frequently Asked Questions"/>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        An Important Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                     <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                 <Typography color={colors.greenAccent[500]} variant="h5">
                    Another Important Question
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </main>
        </div>
    );
}