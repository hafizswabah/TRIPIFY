import axios from 'axios';

const mapboxAPI = axios.create({
  baseURL: 'https://api.mapbox.com',
  params: {
    access_token: 'pk.eyJ1Ijoic2hpamFzMDkiLCJhIjoiY2xpaXUyZHQzMDFzeDNlcGEwbHd6ejJmOCJ9.TZzIUmMeUTVSKfdqqSWgWg' 
  }
});

export default mapboxAPI;