import { Route, Routes } from "react-router-dom";

// import Layout from "./components/layout/Layout";
// import IndexPage from "./pages/Index";

import MainNavigation from "./components/layout/MainNavigation";
import RegisterPage from "./pages/Register";
import Layout from "./components/layout/Layout";
import SignIn from "./components/registration/SignIn";
import AddFlightForm from "./components/flights/AddFlightForm";
import FlightSearch from "./components/flights/FlightSearch";
import FlightSearchPage from "./pages/FlightSearchPage";
import AllFlighttable from "./components/flights/AllFlightsTable";
import { AuthProvider } from "./components/AuthContext";
import BookingComponent from "./components/bookings/BookingComponent";
import MyBookings from "./components/bookings/MyBookings";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/addFlight" element={<AddFlightForm />} />
          <Route path="/searchflight" element={<FlightSearchPage />} />
          <Route path="/allflights" element={<AllFlighttable />} />
          <Route path="/bookflight/:flightId" element={<BookingComponent />} />
          <Route path="/mybookings" element={<MyBookings />} />


        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
