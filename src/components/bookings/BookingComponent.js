import React, { useState } from "react";
import "./BookingComponent.css";
import Backdrop from "../ui/Backdrop";
import Modal from "../ui/Modal";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookingComponent = () => {
  const [passengers, setPassengers] = useState([
    { title: "", firstName: "", lastName: "" },
  ]);

  const { flightId } = useParams();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [price, setPrice] = useState(0);

  const handlePassengerChange = (index, field, value) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers[index][field] = value;
      return updatedPassengers;
    });
  };

  const handleRemovePassenger = (index) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = [...prevPassengers];
      updatedPassengers.splice(index, 1);
      return updatedPassengers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const calculatedPrice = 3400; // Replace with your logic
    setPrice(calculatedPrice);

    // Perform booking logic here
    // Access the passengers array and handle the booking process

    console.log(price);
    setModalIsOpen(true);

    // Reset form fields after successful booking
    // setPassengers([{ title: "", firstName: "", lastName: "", age: "" }]);
  };

  const addPassenger = () => {
    setPassengers((prevPassengers) => [
      ...prevPassengers,
      { title: "", firstName: "", lastName: "", age: "" },
    ]);
  };
  const closeModal = () => {
    console.log(flightId);
    setModalIsOpen(false);
  };

  const data = {
    noOfPassengers: passengers.length,
    passengers: passengers,
    flight: flightId,
  };

  const bookTIcket = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/createbooking",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token
          },
        }
      );
      const fetchedFlightData = response.data;
      console.log(response.data);
      // console.log(data);
      alert(`Ticket Booked Successfully, Total price was: ${response.data.amount}`)
      setModalIsOpen(false)
    } catch (error) {
      console.log(error.message);

      console.log(data);
    }
  };

  return (
    <div className="booking-container">
      {modalIsOpen && <Backdrop onClick={closeModal} totalPrice={price} />}
      {modalIsOpen && (
        <Modal onClickCancel={closeModal} onClickConfirm={bookTIcket} />
      )}

      <h2>Book Flight</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div className="passenger-container" key={index}>
            <h3>Passenger {index + 1}</h3>
            <div className="form-group">
              <label htmlFor={`title-${index}`}>Title:</label>
              <input
                type="text"
                id={`title-${index}`}
                value={passenger.title}
                onChange={(e) =>
                  handlePassengerChange(index, "title", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`firstName-${index}`}>First Name:</label>
              <input
                type="text"
                id={`firstName-${index}`}
                value={passenger.firstName}
                onChange={(e) =>
                  handlePassengerChange(index, "firstName", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`lastName-${index}`}>Last Name:</label>
              <input
                type="text"
                id={`lastName-${index}`}
                value={passenger.lastName}
                onChange={(e) =>
                  handlePassengerChange(index, "lastName", e.target.value)
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`age-${index}`}>Age:</label>
              <input
                type="text"
                id={`age-${index}`}
                value={passenger.age}
                onChange={(e) =>
                  handlePassengerChange(index, "age", e.target.value)
                }
                required
              />
            </div>
            <button
              type="button"
              className="remove-passenger-btn"
              onClick={() => handleRemovePassenger(index)}
            >
              Remove Passenger
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-passenger-btn"
          onClick={addPassenger}
        >
          Add Passenger
        </button>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingComponent;
