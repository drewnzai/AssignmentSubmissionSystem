import React, { useContext, useState } from "react";
import "./SidebarImpl.css";

import AuthService from "../../services/Auth.service";

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import CheckIcon from '@mui/icons-material/Check';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SchoolIcon from '@mui/icons-material/School';
import { UnitContext } from "../../contexts/UnitContext";
import { Unit } from "../../models/Unit";

function SidebarImpl(){
  const [collapsed, setCollapsed] = useState(true);
  
  const navigate = useNavigate();

  const units: Unit[] = JSON.parse(
    localStorage.getItem("units")!
);
  
  const authService = new AuthService();

  const handleToggleSidebar = () => {

    setCollapsed(!collapsed);

  };

  const logout = () => {
    authService.logout();
    navigate("/login");
  };


    return (
      <Sidebar collapsed={collapsed} style={{height: "100vh", backgroundColor: "rgba(0,166,81,255)"}} className="pro-sidebar">
      <Menu>
      <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleToggleSidebar}> </MenuItem>
      <MenuItem icon={<HomeIcon/>} component={<Link to="/" />} ></MenuItem>
      <MenuItem icon={<PersonIcon/>} component={<Link to="/student" />}> Student Details</MenuItem>
        <SubMenu icon={<BookIcon/>} label="Assignments">
        <MenuItem icon={<AssignmentLateIcon/>} component={<Link to="/assignments/pending" />}> Pending</MenuItem>
        <MenuItem icon={<CheckIcon/>} component={<Link to="/assignments/completed" />}> Completed</MenuItem>
        </SubMenu>
        <SubMenu icon={<SchoolIcon/>} label="Current Units">
          {units.map(
            (unit, index) => (
              <MenuItem>{unit.code}</MenuItem>
            )
          )}
        </SubMenu>
          <MenuItem icon={<LogoutIcon/> } onClick={logout}>Logout</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
      </Menu>
    </Sidebar>
      );
}

export default SidebarImpl;