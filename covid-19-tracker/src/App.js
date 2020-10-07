import React, {useEffect, useState} from 'react';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch (" https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((x) => (
          {
            name: x.country, // United States, United Kingdom 
            value: x.countryInfo.iso2 // UK, USA, FR
          }));
          setCountries(countries); // Same as countries.setCountries
      });
    };

    getCountriesData();
  }, []); // anytime something changes [countries]
  
  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    console.log('Yooo', countryCode);

    setCountry(countryCode);
  }

  return (
    <div className="app">
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
      
      {/* Header */}
      {/* {Title + select input dropdown field} */}
      {/* {infoBoxes} */}
      {/* {infoBoxes} */}
      {/* {infoBoxes} */}

      {/* {Table} */}
      {/* {Graph} */}
      {/* {Map} */}
    </div>
  );
}

export default App;
