import React from "react";
import "./SidebarImpl.css";
import 'react-pro-sidebar/dist/css/styles.css';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';

function SidebarImpl(){
    return (
      <Sidebar>
      <Menu>
      <MenuItem component={<Link to="/student" />}> Student Details</MenuItem>
        <SubMenu icon="BookIcon" title="Assignments">
        <MenuItem component={<Link to="/assignments/pending" />}> Pending</MenuItem>
        <MenuItem component={<Link to="/assignments/completed" />}> Completed</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
      );
}

export default SidebarImpl;