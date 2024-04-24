import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PersonIcon from '@mui/icons-material/Person';
import Person2Icon from '@mui/icons-material/Person2';
import { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from "react-router-dom";
import AdAuthService from "../../services/AdAuth.service";
import "./SidebarImpl.css";

function AdSidebar(){
    const [collapsed, setCollapsed] = useState(true);
  
    const navigate = useNavigate();
    
    const authService = new AdAuthService();

    const handleToggleSidebar = () => {

        setCollapsed(!collapsed);
    
      };
    
      const logout = () => {
        authService.logout();
        navigate("/login");
      };
    
    
        return (
          <Sidebar collapsed={collapsed} style={{height: "100vh", marginLeft: "0px", backgroundColor: "rgba(0,166,81,255)"}} className="pro-sidebar">

          <Menu>

          <MenuItem className="menu1" icon={<MenuRoundedIcon />} onClick={handleToggleSidebar}> </MenuItem>
          <MenuItem icon={<HomeIcon/>} component={<Link to="/adminDashboard" />} ></MenuItem>
          <MenuItem icon={<PersonIcon/>} component={<Link to="/admin" />}> Admin Details</MenuItem>

            <SubMenu icon={<Person2Icon/>} label="Management">
            <MenuItem component={<Link to="/admin/unit-management" />}>Unit Management</MenuItem>
            <MenuItem component={<Link to="admin/student-management" />}>Student Management</MenuItem>
            <MenuItem component={<Link to="/admin/lecturer-management" />}>Lecturer Management</MenuItem>
            </SubMenu>

              <MenuItem icon={<LogoutIcon/> } onClick={logout}>Logout</MenuItem>
              <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>

          </Menu>
        </Sidebar>
          );
}

export default AdSidebar;