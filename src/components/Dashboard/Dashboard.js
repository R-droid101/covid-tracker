import React, { useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import Map from "./Map";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";

function Dashboard(props) {
  const [casesType, setCasesType] = useState("cases");

  return (
    <div className="Jian" style={{overflow:"hidden",display:'flex',justifyContent:'center',flexWrap:'wrap',width:'100%',position:'absolute',left:0}}>
      <h1 className="heading" style={{color:"aliceblue"}}>Dashboard</h1>
      <div className="mainApp" style={{display:"flex",justifyContent:"space-between",width:'100%',flexWrap:'wrap'}}>
        <div className="app__left" style={{width:'70%'}}>
          <div className="app__header">
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={props.country}
                onChange={props.onCountryChange}
              >
                <MenuItem value="worldwide">Global</MenuItem>
                {props.countries.map((country) => (
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
              cases={numeral(props.countryInfo.cases).format("0.0a")}
            />

            <InfoBox
              onClick={(e) => setCasesType("recovered")}
              title="Total Recovered"
              active={casesType === "recovered"}
              cases={numeral(props.countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              onClick={(e) => setCasesType("deaths")}
              title="Total Deaths"
              isRed
              active={casesType === "deaths"}
              cases={numeral(props.countryInfo.deaths).format("0.0a")}
            />
          </div>
          <div className="app__country">
            {props.flag !== "" ? (
              <h2>{props.countryInfo.country}</h2>
            ) : (
              <h2>Global Data</h2>
            )}
            {props.flag !== "" ? (
              <img className="image" src={props.flag} alt="Flag" />
            ) : (
              <div></div>
            )}
            <br />
            <h3>More statistics</h3>
            <p>
              <b>Population:</b>{" "}
              {numeral(props.countryInfo.population).format("0.0a")}
              <br />
              <b>Tests performed:</b>{" "}
              {numeral(props.countryInfo.tests).format("0.0a")}
              <br />
              <b>Tests Per One Million:</b>{" "}
              {numeral(props.countryInfo.testsPerOneMillion).format("0.0a")}
              <br />
              <b> Active Cases:</b> {props.countryInfo.active}
              <br />
              <b> Active Per One Million Cases: </b>
              {props.countryInfo.activePerOneMillion}
              <br />
              <b>Critical Cases:</b> {props.countryInfo.critical}
              <br />
              <b> Critical Per One Million Cases:</b>{" "}
              {props.countryInfo.criticalPerOneMillion}
              <br />
            </p>
          </div>
          <div className="app_countrymap">
            <Map
              countries={props.mapCountries}
              center={props.mapCenter}
              zoom={props.zoom}
              casesType={casesType}
            />
          </div>
        </div>
        <div>
        <Card className="app__right"style={{width:'90%'}}>
          <CardContent>
            <div className="app__information">
              <h3>Cases sorted according to Country</h3>
              <Table countries={props.tableData} />
              <h3>Global {casesType}</h3>
              <LineGraph casesType={casesType} />
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
    
  );
}

export default Dashboard;
