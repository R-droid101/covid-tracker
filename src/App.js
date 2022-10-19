import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/Dashboard/InfoBox";
import LineGraph from "./components/Dashboard/LineGraph";
import Table from "./components/Dashboard/Table";
import { sortData } from "./components/Dashboard/util";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
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
        if(countryCode !== "worldwide")
        setFlag(data["countryInfo"].flag);
        else 
        setFlag("");
      });
  };

  return (
    <div>
      <h1 className="heading">Dashboard</h1>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="worldwide">Global</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox
              onClick={(e) => setCasesType("cases")}
              title="Total Cases"
              isRed
              active={casesType === "cases"}
              cases={numeral(countryInfo.cases).format("0.0a")}
            />
    
            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              title="Total Recovered"
              active={casesType === "recovered"}
              cases={numeral(countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="Total Deaths"
              isRed
              active={casesType === "deaths"}
              cases={numeral(countryInfo.deaths).format("0.0a")}
            />
          </div>
          <div className="app__country">
             { flag !== "" ? <h2>{countryInfo.country}</h2> : <h2>Global Data</h2>}
            { flag !== "" ? <img className="image" src={flag} alt="Flag" /> : <div></div> }
            <br/><h3>More statistics</h3>
            <p>
              <b>Population:</b> {numeral(countryInfo.population).format("0.0a")}<br/>
              <b>Tests performed:</b> {numeral(countryInfo.tests).format("0.0a")}<br/>
              <b>Tests Per One Million:</b> {numeral(countryInfo.testsPerOneMillion).format("0.0a")}<br/>
              <b> Active Cases:</b> {countryInfo.active}<br/>
              <b> Active Per One Million Cases: </b>{countryInfo.activePerOneMillion}<br/>
              <b>Critical Cases:</b> {countryInfo.critical}<br/>
              <b> Critical Per One Million Cases:</b> {countryInfo.criticalPerOneMillion}<br/>
            </p>
          </div>
          
        </div>
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <h3>Cases sorted according to Country</h3>
              <Table countries={tableData} />
              <h3>Global {casesType}</h3>
              <LineGraph casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
