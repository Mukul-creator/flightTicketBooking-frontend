import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import "./MyBookings.css";
import Card from "../ui/Card";
import { Link } from "react-router-dom";

function MyBookings() {
  const { isLoggedIn, isAdmin, token } = useContext(AuthContext);
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedBookingData = response.data;
        setBookingData(fetchedBookingData);
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

 

  // Function to format the datetime in a normal format
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Adjust the format as per your requirement
  }

//   if (!Admin) {
//     // Redirect to the homepage if the user is not logged in
//     return <Navigate to="/" />;
//   }

  return (
    <>
      <Card>
        <table className="flight-table">
          <thead>
            <tr>
              
              
              <th>No.of Tickets</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((flight) => (
              <tr key={flight._id}>
                <td>{flight.noOfPassengers}</td>
                <td>{flight.amount  }</td>
                
                
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

export default MyBookings;
