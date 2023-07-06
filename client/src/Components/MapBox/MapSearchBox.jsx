import React, { useState } from 'react'
import mapboxAPI from './MapBoxApi';
import { BiCurrentLocation } from "react-icons/bi";

function MapSearchBox({setDestination}) {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    fetchSuggestions(value);
  };

  setDestination(searchValue)
  const fetchSuggestions = async (value) => {
    try {
        const url = `/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json`;
        const response = await mapboxAPI.get(url);
      const suggestions = response.data.features.map((feature) => feature.place_name);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const onSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const accessToken = 'pk.eyJ1Ijoic2hpamFzMDkiLCJhIjoiY2xpaXUyZHQzMDFzeDNlcGEwbHd6ejJmOCJ9.TZzIUmMeUTVSKfdqqSWgWg';
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const placeName = data.features[0].place_name;
          setSearchValue(placeName)
          console.log(placeName);
        }
      })
      .catch(error => {
        console.log("Error occurred during geocoding:", error);
      });
  };

  const onError = (error) => {
    console.log("Error occurred during geolocation:", error);
  };
  

    const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setSuggestions([]);
  };
   
    return (
        <div>
            <fieldset className="username">
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Location"
                        value={searchValue}
                        onChange={handleSearchChange}
                        style={{width:"100%",borderRadius:"3px",border: '1px solid rgb(207 207 207)'}}
                    />
                    {suggestions.length > 0 && (
                        <div className="suggestion-box">
                            {suggestions.map((suggestion) => (
                                <div
                                    key={suggestion}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {suggestion.substring(0, 20)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
         <div className="current-location" onClick={getCurrentLocation} >
          <span className='me-2' style={{fontSize:'15px',fontWeight:'300'}}>choose current Location</span>
          <BiCurrentLocation/>
          </div>
            </fieldset>
        </div>
    )
}

export default MapSearchBox