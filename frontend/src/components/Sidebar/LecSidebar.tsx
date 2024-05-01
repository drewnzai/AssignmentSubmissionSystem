import {useEffect, useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BookIcon from '@mui/icons-material/Book';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PersonIcon from '@mui/icons-material/Person';
import {Menu, MenuItem, Sidebar, SubMenu} from 'react-pro-sidebar';
import {Link, useNavigate} from "react-router-dom";
import {Unit} from "../../models/Unit";
import LecAuthService from "../../services/Lecturer/LecAuth.service";
import "./SidebarImpl.css";

function LecSidebar(){
  const [collapsed, setCollapsed] = useState(true);
  
  const navigate = useNavigate();

  const [units, setUnits] = useState<Unit[]>([]);
  
  const authService = new LecAuthService();

  useEffect((
    () => (
      setUnits(JSON.parse(localStorage.getItem("units")!))
    )
  ), []);

  const handleToggleSidebar = () => {

    setCollapsed(!collapsed);

  };

  const logout = () => {
    authService.logout();
    navigate("/login");
  };


    return (
      <Sidebar collapsed={collapsed} style={{height: "100vh", marginLeft: "0px", backgroundColor: "rgba(0,166,81,255)" }} className="pro-sidebar">
      <Menu>
      <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleToggleSidebar}> </MenuItem>
      <MenuItem icon={<HomeIcon/>} component={<Link to="/lecturerDashboard" />} ></MenuItem>
      <MenuItem icon={<PersonIcon/>} component={<Link to="/lecturer" />}> Lecturer Details</MenuItem>
        <SubMenu icon={<BookIcon/>} label="Assignments">
        <MenuItem icon={<AssignmentIndIcon/>} component={<Link to="/assignments/lecturer" />}> Pending </MenuItem>    
        <MenuItem icon={<AddIcon/>} component={<Link to="/assignments/create" />}> Create</MenuItem>  
        <MenuItem icon={<DeleteForeverIcon/>} component={<Link to="/assignments/delete" />}> Delete</MenuItem> 
        </SubMenu>
        <MenuItem icon={<AssignmentIcon/>} component={<Link to="/submissions/lecturer" />}> Submissions</MenuItem>  
          <MenuItem icon={<LogoutIcon/> } onClick={logout}>Logout</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
      </Menu>
    </Sidebar>
      );
}

export default LecSidebar;