import React from "react";
import "./SidebarImpl.css";
import 'react-pro-sidebar/dist/css/styles.css';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";

function SidebarImpl(){
    return (
      <Sidebar>
      <Menu>
        <SubMenu title="Assignments">
        <MenuItem component={<Link to="/assignments/pending" />}> Pending</MenuItem>
        <MenuItem component={<Link to="/assignments/completed" />}> Completed</MenuItem>
        </SubMenu>
        <MenuItem>
          Students
          <Link to="/students" />
        </MenuItem>
      </Menu>
    </Sidebar>
      );
}

export default SidebarImpl;