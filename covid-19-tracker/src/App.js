import React, {useState} from 'react';
import {
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

import './App.css';

function App() {
  const [countries, setCountries] = useState([
    'USA', 'UK', 'India'
  ]);
  // STATE = How to write a variable in REACT
  // https://disease.sh/v3/covid-19/countries
  
  return (
    <div className="app">
      <div className="app_header">
        <h1>Lets build a COVID 19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc"
          >
            {
              countries.map((country) => (
                <MenuItem value={country}>{country}</MenuItem>

            ))}
            {/* Loop through all the countries and show a drop down list of the options */}
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">Yooo</MenuItem> */}

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
