import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(){

    return(
        <nav className="navbar">
      <div className="container">
        <div className="logo">
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <Link to="/adminLogin">Admin</Link>
            </li>
            <li>
              <Link to="/lecturerLogin">Lecturer</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
}

export default Navbar;