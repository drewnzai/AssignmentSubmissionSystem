import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar(){

  const navigate = useNavigate();

  const navigateToLecturerLogin = () => {
    navigate('/lecturerLogin');
  };

  const navigateToAdminLogin = () => {
    navigate('/adminLogin');
  };
    return(
      <nav className="navbar">
      <button onClick={navigateToLecturerLogin} className="navbar-button">
        Lecturer Login
      </button>
      <button onClick={navigateToAdminLogin} className="navbar-button">
        Admin Login
      </button>
    </nav>
    );
}

export default Navbar;