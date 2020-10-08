import React, {useEffect, useState} from 'react';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox.js";
import Map from "./Map.js";
import './App.css';
import Table from "./Table.js";
import {sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]  = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = 
  useState({ lat:43.80746, lng: -40.47});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
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
          setMapCountries(data);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4);
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
          <InfoBox 
          isRed
          active={casesType === "cases"}
            onClick={e => setCasesType('cases')}
            title="Coronavirus cases" 
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox 
          active={casesType === "recovered"}
            onClick={e => setCasesType('recovered')}
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox 
          isRed
          active={casesType === "deaths"}
            onClick={e => setCasesType('deaths')}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>

        <Map casesType={casesType} countries = {mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card className ="app_right">
        <CardContent>

          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>World Wide {casesType}</h3>
          <LineGraph casesType={casesType}/>

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
