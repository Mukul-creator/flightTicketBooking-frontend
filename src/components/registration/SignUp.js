import { useRef } from "react";
import axios from "axios";

import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const fullNameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email: emailRef.current.value,
      mobile: mobileRef.current.value,
      fullName: fullNameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post("http://15.206.27.173:8080/api/signup", newUser); // Replace "/api/signup" with your actual signup endpoint
      console.log(response.data); // Assuming the server responds with the created user data
      navigate("/login"); // Redirect to the login page after successful signup
    } catch (error) {
      console.log(error);
      alert("login Failed")
      navigate("/")
    }
  };

  return (
    <div className={classes.signin}>
      <div className={classes.content}>
        <h2 className={classes.hero}>Register</h2>

        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.inputBox}>
            <input type="email" ref={emailRef} required placeholder="Email" />
          </div>
          <div className={classes.inputBox}>
            <input type="mobile" ref={mobileRef} required placeholder="Mobile" />
          </div>
          <div className={classes.inputBox}>
            <input type="text" ref={fullNameRef} required placeholder="Full Name" />
          </div>

          <div className={classes.inputBox}>
            <input type="password" ref={passwordRef} required placeholder="Password" />
          </div>

          <div className={classes.links}>
            <a href="/login">Already a user !!</a>
          </div>

          <div className={classes.actions}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
