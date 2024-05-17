import {Box} from "@mui/material";
import {tokens} from "../theme.ts";
import useTheme from "@mui/material/styles/useTheme";
import {styled} from "@mui/system";
import {Tab as BaseTab} from "@mui/base/Tab/Tab";
import {tabClasses} from "@mui/base/Tab";
import {buttonClasses} from "@mui/base/Button";
import {TabPanel as BaseTabPanel} from "@mui/base/TabPanel/TabPanel";
import {TabsList as BaseTabsList} from "@mui/base/TabsList/TabsList";
import {Tabs} from "@mui/base/Tabs";
import AdminLogin from "../components/Admin/AdminLogin.tsx";
import LecturerLogin from "../components/Lecturer/LecturerLogin.tsx";
import StudentLogin from "../components/Student/StudentLogin.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminService from "../services/Admin.service.ts";
import LecturerService from "../services/Lecturer.service.ts";

export default function Login(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const adminService = new AdminService();
    const lecturerService = new LecturerService();

    const navigate = useNavigate();

    const admin = adminService.getCurrentUser();
    const lecturer = lecturerService.getCurrentUser();

    useEffect(() => {
        if(admin){
            navigate("/admin/home");
        }
        else if(lecturer){
            navigate("/lecturer/home");
        }
        
    }, []);
    

    const Tab = styled(BaseTab)`
  font-family: 'Source Sans 3', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${colors.blueAccent[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${colors.blueAccent[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${colors.blueAccent[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

    const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

    const TabsList = styled(BaseTabsList)(
        ({ theme }) => `
  min-width: 400px;
  background-color: ${colors.blueAccent[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${
            theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
        };
  `)




    return(
        <Box display={"flex"}
             sx={{
                 alignItems: "center",
                 justifyContent: "center",
                 backgroundColor: `${colors.primary[800]}`,
                 padding: "3px"
             }}>
            <Box height={"621px"} width={"400px"}
            sx={{


                borderRadius: "9px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${colors.primary[600]}`
            }}>
                <Tabs defaultValue={0}>
                    <TabsList>
                        <Tab value={0}>Admin</Tab>
                        <Tab value={1}>Lecturer</Tab>
                        <Tab value={2}>Student</Tab>
                    </TabsList>
                    <TabPanel value={0}><AdminLogin/></TabPanel>
                    <TabPanel value={1}><LecturerLogin/></TabPanel>
                    <TabPanel value={2}><StudentLogin/></TabPanel>
                </Tabs>


            </Box>
        </Box>
    );
}