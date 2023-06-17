import { useRef } from "react";
import { useContext } from "react";
import Cookies from "js-cookie";

import { AuthContext } from "../AuthContext";

import { Navigate } from "react-router-dom";

import classes from "./SignUp.module.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

function SignIn() {
  const { isLoggedIn, setIsLoggedIn, user, setUser, token, setToken, isAdmin, setIsAdmin} = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };
  
    console.log(userData);
  
    try {
      const response = await axios.post("http://15.206.27.173:8080/api/login", userData);
      const token = response.data.token;
      
      console.log(token);
      Cookies.set("token", token, {
        expires: 7,
      });
  
      setIsLoggedIn((prevLoggedIn)=> true);
      setUser(jwtDecode(token));
      setToken(() => token)
      if((jwtDecode(token).role)=== "admin") {
        setIsAdmin(true)
      }
      console.log(jwtDecode(token))
    //   Navigate("/allflights")
  
      // Handle successful login logic here, such as navigation or component rendering
  
    } catch (error) {
      console.log(error.message);
      alert("Login Failed");
    }
  };

  if (isLoggedIn) {
    // Redirect to the homepage if the user is not logged in
    return <Navigate to="/" />;
  }

  return (
    <div className={classes.signin}>
      <div className={classes.content}>
        <h2 className={classes.hero}>Sign In</h2>
        <form onSubmit={submitHandler}>
          <div className={classes.form}>
            <div className={classes.inputBox}>
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder="Email"
                ref={emailInputRef}
              />
            </div>

            <div className={classes.inputBox}>
              <input
                type="text"
                required
                placeholder="password"
                ref={passwordInputRef}
              />
            </div>

            <div className={classes.links}>
              {" "}
              <a href="#">Forgot Password</a> <a href="/register">Signup</a>
            </div>

            <div className={classes.actions}>
              <button type="submit"> Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
