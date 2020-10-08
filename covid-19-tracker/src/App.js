import React, {useEffect, useState} from 'react';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import InfoBox from './InfoBox.js';
import Map from "./Map.js";
import './App.css';
import Table from "./Table.js";
import {sortData} from "./util";
import LineGraph from "./LineGraph";
// import numeral from "numeral";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]  = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((x) => (
          {
            name: x.country, // United States, United Kingdom 
            value: x.countryInfo.iso2 // UK, USA, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries); // Same as countries.setCountries
      });
    };

    getCountriesData();
  }, []); // anytime something changes [countries]
  
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        setCountryInfo(data);
      });
  };

  console.log('country info >>', countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Lets build a COVID 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map />
      </div>

      <Card className ="app_right">
        <CardContent>
          {/* {table and graph} */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>World Wide New Cases</h3>
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
