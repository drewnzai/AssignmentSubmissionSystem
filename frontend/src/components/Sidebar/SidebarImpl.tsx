import React, { useState } from "react";
import "./SidebarImpl.css";

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function SidebarImpl(){
  const [collapsed, setCollapsed] = useState(true);


  const handleToggleSidebar = () => {

    setCollapsed(!collapsed);

  };


    return (
      <Sidebar collapsed={collapsed} style={{height: "100vh", backgroundColor: "rgba(0,166,81,255)"}} className="pro-sidebar">
      <Menu>
      <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleToggleSidebar}> </MenuItem>
      <MenuItem icon={<ReceiptOutlinedIcon />} component={<Link to="/student" />}> Student Details</MenuItem>
        <SubMenu icon={<BookIcon/>} label="Assignments">
        <MenuItem component={<Link to="/assignments/pending" />}> Pending</MenuItem>
        <MenuItem component={<Link to="/assignments/completed" />}> Completed</MenuItem>
        </SubMenu>
          <MenuItem icon={<LogoutIcon/> } component={<Link to="/logout" />}>Logout</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
      </Menu>
    </Sidebar>
      );
}

export default SidebarImpl;