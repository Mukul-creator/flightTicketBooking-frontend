import React from "react";
import "./FlightItem.css";
import BookingComponent from "../bookings/BookingComponent";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useHistory} from "react-router-dom"

function FlightItem({ flight }) {
    const navigate = useNavigate();

    const handleBooking = (flightId) => {
        navigate(`/bookflight/${flightId}`);
    };
  return (
    <div className="flight-item">
      <div className="flight-item-header">
        <h3>{flight.flightNumber}</h3>
        <span>{flight.airline}</span>
      </div>
      <div className="flight-item-details">
        <p>
          <span>Departure:</span> {flight.departure}
        </p>
        <p>
          <span>Arrival:</span> {flight.arrival}
        </p>
        <p>
          <span>Departure Airport:</span> {flight.departureAirport}
        </p>
        <p>
          <span>Arrival Airport:</span> {flight.arrivalAirport}
        </p>
        <p>
          <span>Duration:</span> {flight.flightDuration} minutes
        </p>
        <p>
          <span>Available Seats:</span> {flight.availableSeats}
        </p>
        <p>
          <span>Price:</span> {flight.price}
        </p>
      </div>
      <div className="flight-item-actions">
        <button onClick={()=> handleBooking(flight._id)}>Book Now</button>
      </div>
    </div>
  );
}

export default FlightItem;
