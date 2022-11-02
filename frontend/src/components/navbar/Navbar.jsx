import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const logOutFunc = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      dispatch({ type: "LOGOUT" });
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      navigate("/auth");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Lovely Shelter</span>
        </Link>
        {user ? (
          <div className="profile">
            <h3 className="username">{user.username}</h3>
            <button className="navButton" onClick={logOutFunc}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link
              to="/auth"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
