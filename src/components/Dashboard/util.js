import React, { useEffect } from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
// import { useEffect } from "react";

// useEffect(() => {
//   fetch("https://disease.sh/v3/covid-19/all")
//     .then((response) => response.json())
//     .then((data) => {
//       // data = data;
//       console.log(data);
//     });
// });

const casesTypeColors = {
  cases: {
    hex: "#eb657e",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#c7f285",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#8f3f3f",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};



export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// Delay(1000);

export const showDataOnMap = (data, casesType = "cases") =>


data ? (
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      // pathOptions={{
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
      // }}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]/10) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ))
) : (
  <>
    <img src="https://media.npr.org/assets/img/2020/06/01/seamus-coronavirus-d3-world-map-20200323_wide-2af60c9806ed2cea1e48634ff079ab4e81ce70f4.png" alt="loading" />
  </>
)
  
