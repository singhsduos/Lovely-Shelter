import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Lovely Shelter</span>
        </Link>
        {user ? (
          <h3 className="username">{user.username}</h3>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
