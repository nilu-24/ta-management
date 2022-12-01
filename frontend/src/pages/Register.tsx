import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mcgill_logo.jpg";
import { UserContext } from "../App";
import "../App.css";
import "../style/login.css";

const Register: React.FC = () => {
  // Load global state
  const { user, setUser } = useContext(UserContext);

  // Declare hooks
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<string[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // on submit pass email and password values entered by user
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // error if empty email or password
    if (!email || !password || !firstName || !lastName || !userType) {
      // error if user does not enter username and/or password
      console.error("Please provide all your credentials.");
      setError("Please provide all your credentials.");
      return;
    }

    try {
      // Make login API call
      // CAUTION: Do not hardcode the URLs, instead use routers
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              firstName:firstName,
              lastName:lastName,
            email: email,
            password: password,
            userType:userType
          }),
        }
      );

      // If login was successful, set user and redirect to home page
      if (res.status === 201) {
        const result = await res.json();
        // set user state
        setUser(result);
        navigate("/dashboard");
        return;
      } else {
        // error unable to login, invalid username or password
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="welcome">
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <img className="logo" src={logo} alt="mcgill-logo" />

            <p className="top">Register with your email and password.</p>
            {error !== "" ? <div className="error"> * {error} </div> : ""}


             <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>


            <div className="form-group">

              <input
                type="text"
                name="email"
                placeholder="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="userType"
                placeholder="Enter User Type"
                id="userType"
                onChange={(e) => setUserType([e.target.value])}
              />
            </div>


            <div className="sign-in-button">
              <input type="submit" value="Sign in" />
            </div>

            {console.log({
              firstName, 
              lastName,
              email,
              password,
              userType
            })}

            <p className="bottom">
              <Link className="links" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
