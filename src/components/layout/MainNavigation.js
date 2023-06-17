import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../AuthContext";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    token,
    setToken,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);
    setToken(null);

    <Navigate to="/" />;
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Flight Booking</Link>
      </div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!isAdmin && isLoggedIn && (
            <li>
              <Link to="/searchflight">Search Flights</Link>
            </li>
          )}
          {!isAdmin && isLoggedIn && (
            <li>
              <Link to="/myBooking">My Booking</Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link to="/allflights">All Flights</Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link to="/addflight">Add Flight</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
