import React, { useState } from "react";
import "./SidebarImpl.css";

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function SidebarImpl(){
  const [collapsed, setCollapsed] = useState(false);


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
        <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
      </Menu>
    </Sidebar>
      );
}

export default SidebarImpl;