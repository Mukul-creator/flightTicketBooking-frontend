// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../AuthContext";
// import axios from "axios";
// import "./FlightSearch.css";
// import Card from "../ui/Card";

// const FlightSearch = () => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [NoOfPassengers, setNumberOfPassenger] = useState("");
//   const [flightData, setFlightData] = useState([]);

//   //   useEffect(() => {
//   //     // Fetch flight data from the API based on search parameters
//   //     const fetchData = async () => {
//   //       try {
//   //         const response = await axios.get(
//   //           `http://localhost:8080/api/flights?departureAirport=${origin}&arrivalAirport=${destination}&date=${departureDate}&passenger=${NoOfPassengers}`,
//   //           {
//   //             headers: {
//   //               Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY0OGJiODhjMjRlODZhZTU2NDEwNjg2OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4Njk2NDk4OCwiZXhwIjoxNzE4NTAwOTg4fQ.tIRYyc-GIUYmZ5JP2KNNc74C2U6rJRODgx6NVacPYIU"}`, // Replace with your token
//   //             },
//   //           }
//   //         );
//   //         const fetchedFlightData = response.data;
//   //         console.log(response.data)
//   //         setFlightData(fetchedFlightData);
//   //       } catch (error) {
//   //         console.log(error);
//   //       }
//   //     };

//   //     fetchData();
//   //   }, [origin, destination, departureDate, NoOfPassengers]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/flights?departureAirport=${origin}&arrivalAirport=${destination}&date=${departureDate}&passenger=${NoOfPassengers}`,
//         {
//           headers: {
//             Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY0OGJiODhjMjRlODZhZTU2NDEwNjg2OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4Njk2NDk4OCwiZXhwIjoxNzE4NTAwOTg4fQ.tIRYyc-GIUYmZ5JP2KNNc74C2U6rJRODgx6NVacPYIU"}`, // Replace with your token
//           },
//         }
//       );
//       const fetchedFlightData = response.data;
//       console.log(response.data);
//       setFlightData(fetchedFlightData);
//     } catch (error) {
//       console.log(error);
//     }

//     // console.log({
//     //   from: origin,
//     //   to: destination,
//     //   departure: departureDate,
//     //   totalPassenger: NoOfPassengers,
//     // });
//   };

//   return (
//     <div className="flight-search-container">
//       <Card>
//         <form className="flight-search" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="From"
//               value={origin}
//               onChange={(e) => setOrigin(e.target.value)}
//             />
//             <span className="icon">
//               <i className="fas fa-map-marker-alt"></i>
//             </span>
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="To"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//             />
//             <span className="icon">
//               <i className="fas fa-map-marker-alt"></i>
//             </span>
//           </div>
//           <div className="form-group">
//             <input
//               type="date"
//               placeholder="Departure Date"
//               value={departureDate}
//               onChange={(e) => setDepartureDate(e.target.value)}
//             />
//             <span className="icon">
//               <i className="far fa-calendar-alt"></i>
//             </span>
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="No. of Passengers"
//               value={NoOfPassengers}
//               onChange={(e) => setNumberOfPassenger(e.target.value)}
//             />
//             <span className="icon">
//               <i className="far fa-calendar-alt"></i>
//             </span>
//           </div>
//           <button type="submit">
//             <span className="btn-text">Search</span>
//             <i className="fas fa-search"></i>
//           </button>
//         </form>
//       </Card>
//       {/* <div>{console.log(flightData.data)}</div> */}
//     </div>
//   );
// };

// export default FlightSearch;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./FlightSearch.css";
import { AuthContext } from "../AuthContext";

import Card from "../ui/Card";
import FlightList from "./FlightList";

const FlightSearch = () => {
    const { isLoggedIn, isAdmin, token } = useContext(AuthContext);

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [NoOfPassengers, setNumberOfPassenger] = useState("");
  const [flightData, setFlightData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://15.206.27.173:8080/flights?departureAirport=${origin}&arrivalAirport=${destination}&date=${departureDate}&passenger=${NoOfPassengers}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your token
          },
        }
      );
      const fetchedFlightData = response.data;
      console.log(response.data);
      setFlightData(fetchedFlightData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flight-search-container">
      <Card>
        <form className="flight-search" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="From"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <span className="icon">
              <i className="fas fa-map-marker-alt"></i>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="To"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <span className="icon">
              <i className="fas fa-map-marker-alt"></i>
            </span>
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Departure Date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <span className="icon">
              <i className="far fa-calendar-alt"></i>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="No. of Passengers"
              value={NoOfPassengers}
              onChange={(e) => setNumberOfPassenger(e.target.value)}
            />
            <span className="icon">
              <i className="far fa-calendar-alt"></i>
            </span>
          </div>
          <button type="submit">
            <span className="btn-text">Search</span>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </Card>
      <div className="flightList">
        {flightData.length > 0 && <FlightList flightData={flightData} />}
      </div>
    </div>
  );
};

export default FlightSearch;
