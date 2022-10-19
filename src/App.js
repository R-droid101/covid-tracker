import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { sortData } from "./components/Dashboard/util";
import Header from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import {
  BrowserRouter,
  Router,
  Routes,
  Navigate,
  Route,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [flag, setFlag] = useState("");

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
        if (countryCode !== "worldwide") setFlag(data["countryInfo"].flag);
        else setFlag("");
      });
  };
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
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

  const loginHandler = () => {
    setLoggedIn(true);
  };
  console.log(loggedIn);
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
                <Header logout={logoutHandler} />
                <Dashboard
                  country={country}
                  countries={countries}
                  countryInfo={countryInfo}
                  onCountryChange={onCountryChange}
                  tableData={tableData}
                  flag={flag}
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
                <Header logout={logoutHandler} />
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
      </Routes>
    </>
  );
};

export default App;
