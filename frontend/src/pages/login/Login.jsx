import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const initialState = {
    email: "",
    username: "",
    password: "",
    confirmpass: "",
    phone: "",
    country: "",
    city: "",
  };

  const { loading, error, dispatch } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);

  const navigate = useNavigate();

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
    if (error != null) {
      error.message = "";
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    setConfirmPass(true);
    e.preventDefault();

    if (!isSignUp) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(
          "https://lovelyshelter-backend.onrender.com/api/auth/login",
          data
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    } else {
      data.password === data.confirmpass ? signIn() : setConfirmPass(false);
    }
  };

  const signIn = async () => {
    dispatch({ type: "REGISTER_START" });
    try {
      await axios.post(
        "https://lovelyshelter-backend.onrender.com/api/auth/register",
        data
      );
       dispatch({ type: "REGISTER_SUCCESS" });
      window.location.reload();
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="Auth">
      {/* left side */}

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleClick}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <>
              <div>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="infoInput"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Phone number (Optional)"
                  className="infoInput"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City (Optional)"
                  className="infoInput"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  placeholder="Country (Optional)"
                  className="infoInput"
                  name="country"
                  value={data.country}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          {error && (
            <span
              style={{
                color: "red",
                fontSize: "15px",
                alignSelf: "flex-end",
                marginRight: "5px",
                display: "block",
              }}
            >
              {error.message}
            </span>
          )}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account? Login Please!"
                : "Don't have an account? Sign up here!"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
