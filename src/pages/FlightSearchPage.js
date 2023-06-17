import { useState } from "react";
import FlightSearch from "../components/flights/FlightSearch";
import FlightList from "../components/flights/FlightList";
import AllFlighttable from "../components/flights/AllFlightsTable";

function FlightSearchPage() {
  const [flightData, setFlightData] = useState([]);
  return (
    <div>
      <FlightSearch />
      <FlightList flights = {flightData}/>
      {/* <AllFlighttable/> */}
    </div>

  );
}

export default FlightSearchPage;
