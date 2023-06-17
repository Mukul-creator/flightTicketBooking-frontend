import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";


import axios from "axios";

import "./AddFlightForm.css";

const AddFlightForm = () => {
    const { isLoggedIn, isAdmin, token } = useContext(AuthContext);

  const [flight, setFlight] = useState({
    airline: "",
    flightNumber: "",
    departureAirport: "",
    arrivalAirport: "",
    departure: null,
    arrival: null,
    price: "",
  });

  const handleDateChange = (date, fieldName) => {
    setFlight({ ...flight, [fieldName]: date });
  };

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(flight);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/addflight`,
        flight,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token
          },
        }
      );

      console.log({ message: "Added successfully" });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setFlight({
      airline: "",
      flightNumber: "",
      departureAirport: "",
      arrivalAirport: "",
      departure: "",
      arrival: "",
      price: "",
    });
  };

  if (!isLoggedIn) {
    // Redirect to the homepage if the user is not logged in
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="flight-form">
      <div className="form-group">
        <label htmlFor="airline">Airline:</label>
        <input
          type="text"
          id="airline"
          name="airline"
          value={flight.airline}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="flightNumber">Flight Number:</label>
        <input
          type="text"
          id="flightNumber"
          name="flightNumber"
          value={flight.flightNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="departureAirport">Origin:</label>
        <input
          type="text"
          id="departureAirport"
          name="departureAirport"
          value={flight.departureAirport}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="arrivalAirport">Destination:</label>
        <input
          type="text"
          id="arrivalAirport"
          name="arrivalAirport"
          value={flight.arrivalAirport}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="departure">Departure Time:</label>
        <DatePicker
          id="departure"
          selected={flight.departure}
          onChange={(date) => handleDateChange(date, "departure")}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="date-picker"
          autoComplete="off"
          minDate={Date.now()}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="arrival">Arrival Time:</label>
        <DatePicker
          id="arrival"
          selected={flight.arrival}
          onChange={(date) => handleDateChange(date, "arrival")}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="date-picker"
          autoComplete="off"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={flight.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Flight</button>
    </form>
  );
};

export default AddFlightForm;
