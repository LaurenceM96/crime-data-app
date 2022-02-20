import './App.css';
import Crimes from './components/crime';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

function App() {

  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [locdata, setLocdata] = useState([]);
  const [postcode, setPostcode] = useState('');

  const { handleSubmit } = useForm();
  const onSubmit = (data, e) => handleInput(e.target[0].value, setLng, setLat);
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input placeholder="Enter Postcode for Crime Data" className="input-box" enterKeyHint="search"/>
      </form>
      <Crimes lng={lng} lat={lat} />
    </div>
  );
}

async function handleInput(input, setLng, setLat) {
  //Remove spaces
  input = input.replace(/\s/g, '');

  //Fetch Data
  const postcodeData = await fetchData('https://api.postcodes.io/postcodes/' + input);

  //Set lng and lat
  setLng(postcodeData.result.longitude);
  setLat(postcodeData.result.latitude);
}

async function fetchData(url) {
  //Fetch Data
  const response = await fetch(url);

  const json = await response.json();
  return json;
}

export default App;
