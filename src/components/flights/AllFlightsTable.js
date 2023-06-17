import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import "./AllFlightTable.css";
import Card from "../ui/Card";
import AddFlightForm from "./AddFlightForm";
import { Link } from "react-router-dom";

function AllFlighttable() {
  const { isLoggedIn, isAdmin, token } = useContext(AuthContext);
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://15.206.27.173:8080/api/allflights",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedFlightData = response.data;
        setFlightData(fetchedFlightData);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // const onClickAdd = (e) => {

  //   e.preventDefault();
  //   return <Navigate to="/" />;
  // };

  const deleteFlight = async (flightId) => {
    try {
      await axios.delete(`http://15.206.27.173:8080/api/removeflight/${flightId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted flight from the flightData array
      setFlightData((prevFlightData) =>
        prevFlightData.filter((flight) => flight._id !== flightId)
      );
      console.log(`Flight with ID ${flightId} deleted successfully.`);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to format the datetime in a normal format
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Adjust the format as per your requirement
  }

  if (!isLoggedIn) {
    // Redirect to the homepage if the user is not logged in
    return <Navigate to="/" />;
  }

  return (
    <>
      <Card>
        <table className="flight-table">
          <thead>
            <tr>
              <th>Airline</th>

              <th>Flight Number</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Duration (in minutes)</th>
              <th>Available Seats</th>
              <th>Price</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {flightData.map((flight) => (
              <tr key={flight._id}>
                <td>{flight.airline}</td>
                <td>
                  {" "}
                  <td>
                    {<Link to="/searchflight">{flight.flightNumber}</Link>}
                  </td>
                </td>
                <td>{formatDateTime(flight.departure)}</td>
                <td>{formatDateTime(flight.arrival)}</td>
                <td>{flight.departureAirport}</td>
                <td>{flight.arrivalAirport}</td>
                <td>{flight.flightDuration}</td>
                <td>{flight.availableSeats}</td>
                <td>{flight.price}</td>
                <td>
                  <button onClick={() => deleteFlight(flight._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {/* <div className="btn-box">
        <button className="btn-add" onClick={onClickAdd}>
          +
        </button>
      </div> */}
    </>
  );
}

export default AllFlighttable;
