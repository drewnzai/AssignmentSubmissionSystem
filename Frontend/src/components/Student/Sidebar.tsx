import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Menu, MenuItem, ProSidebar} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {tokens} from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StudentService from "../../services/Student.service";


const Item = ({ title, to, icon, selected, setSelected }: 
  {title:string, to:string, icon:any, selected:string, setSelected:Dispatch<SetStateAction<string>> }) => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colours.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

export default function Sidebar(){
  const theme = useTheme();
  const colours = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [student, setStudent] = useState({
    authenticationToken: "",
    refreshToken: "",
    expiresAt: "",
    registration: ""
  });

  const service = new StudentService();

  useEffect(() => {
    setStudent(service.getCurrentUser());
  }, []);

    return(
        <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colours.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu>
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colours.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colours.grey[100]}>
                    ASSIGNSUB
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
  
            {!isCollapsed && (
              <Box mb="25px">
                
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    color={colours.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0", wordBreak: "break-all"}}
                  >
                    {student.registration}
                  </Typography>
                  </Box>
              </Box>
            )}
  
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/student/home"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
  
              <Typography
                variant="h6"
                color={colours.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Pages
              </Typography>
              <Item
                title="Submissions"
                to="/student/submissions"
                icon={<AssignmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            <Item
                title="FAQ Page"
                to="/student/faq"
                icon={<HelpOutlineOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              
              <MenuItem
              style={{
                color: colours.grey[100],
              }}
              onClick={() => service.logout()}
              icon={<LogoutIcon/>}
            >
              <Typography>Logout</Typography>
              
              
              </MenuItem>
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
}