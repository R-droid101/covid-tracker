import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { sortData } from "./components/Dashboard/util";
import Header from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import News from "./components/News/News";
import Volunteer from "./components/Volunteer/Volunteer";
import NGOhomepage from "./components/NGO/NGOhomepage";
import eventList from "./components/EventList/eventList";
import {
  BrowserRouter,
  Router,
  Routes,
  Navigate,
  Route,
  useNavigate,
} from "react-router-dom";
import NewUser from "./components/Dashboard/NewUser";

const App = () => {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [flag, setFlag] = useState("");
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [zoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (countryCode !== "worldwide") {
          setFlag(data["countryInfo"].flag);
          setMapCenter([34.80746, -40.4796]);
        } else {
          setFlag("");
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setZoom(4);
        }
      });
  };
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const newUser = () => {
    navigate("/newUser");
  };
  const logoutHandler = () => {
    sessionStorage.removeItem("data");
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (sessionStorage.getItem("data")) {
      setLoggedIn(true);
    }
  }, []);
  const newsHandler = () => {
    navigate("/news");
  };
  const volunteer = () => {
    navigate("/volunteer");
  };
  const eventList = () => {
    navigate("/eventList");
  };
  const loginHandler = () => {
    setLoggedIn(true);
  };
  const homeHandler = () => {
    navigate("/");
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !loggedIn ? (
              <Login login={loginHandler} />
            ) : (
              <>
                <Header
                  logout={logoutHandler}
                  addNew={newUser}
                  checkNews={newsHandler}
                  home={homeHandler}
                  volunteer={volunteer}
                />
                <Dashboard
                  country={country}
                  countries={countries}
                  countryInfo={countryInfo}
                  onCountryChange={onCountryChange}
                  tableData={tableData}
                  flag={flag}
                  mapCenter={mapCenter}
                  zoom={zoom}
                  mapCountries={mapCountries}
                />
              </>
            )
          }
        ></Route>
        <Route
          path="/home"
          element={
            loggedIn ? (
              <>
                <Header
                  logout={logoutHandler}
                  addNew={newUser}
                  checkNews={newsHandler}
                  home={homeHandler}
                  volunteer={volunteer}
                />
                <Dashboard
                  country={country}
                  countries={countries}
                  countryInfo={countryInfo}
                  onCountryChange={onCountryChange}
                  tableData={tableData}
                  flag={flag}
                />
              </>
            ) : (
              <Login login={loginHandler} />
            )
          }
        ></Route>
        <Route
          path="/newUser"
          element={loggedIn ? <NewUser /> : <Login login={loginHandler} />}
        ></Route>
        <Route
          path="/NGOhomepage"
          element={
            loggedIn ? (
              <>
                <Header
                  logout={logoutHandler}
                  addNew={newUser}
                  checkNews={newsHandler}
                  home={homeHandler}
                  listEvents={eventList}
                />
                <Dashboard
                  country={country}
                  countries={countries}
                  countryInfo={countryInfo}
                  onCountryChange={onCountryChange}
                  tableData={tableData}
                  flag={flag}
                />
              </>
            ) : (
              <Login login={loginHandler} />
            )
          }
        ></Route>
        <Route
          path="/news"
          element={
            loggedIn ? (
              <>
                <Header
                  logout={logoutHandler}
                  addNew={newUser}
                  checkNews={newsHandler}
                  home={homeHandler}
                  volunteer={volunteer}
                />
                <News />
              </>
            ) : (
              <Login login={loginHandler} />
            )
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
