import React from "react";
import FlightItem from "./FlightItem";
import "./FlightList.css";

function FlightList({ flightData }) {
  // Check if flightData is undefined or not an array
  if (!flightData || !Array.isArray(flightData)) {
    return null; // Return null or an appropriate fallback UI
  }

  return (
    <div className="flight-list">
      {flightData.map((flight) => (
        <FlightItem key={flight._id} flight={flight} />
      ))}
    </div>
  );
}

export default FlightList;