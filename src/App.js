import React,{useState} from 'react';
import './App.css';
const api={
  key: `${process.env.API_KEY}`,
  base:`${process.env.BASE_URL}`,
}
function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({}); 

  const search = e =>{
    if(e.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    
    }
  }
  const dateBuilder=(d)=>{
        let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day=days[d.getDay()];
        let date=d.getDate();
        let month=months[d.getMonth()];
        let year=d.getFullYear();

        return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main!="undefined") ? ((weather.main.temp>16)?'app warm' : 'app'):'app'}>
      <div className="header">
        <p>Search the place for weather information 
         <span> WEATHER APP </span>
        </p>
      </div>
      
      
      <main>
      {/* <h1>WEATHER APP</h1> */}
        <div className="search-box">
          <input 
          type="text"
          className="searchbar" 
          placeholder="search city"
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main !="undefined") ? (
       <div className="weather-card">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div> 
            <div className="date"> {dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <h4>Max-temp  :  {Math.round(weather.main.temp_max)}°c</h4>
            <h4>Min-temp  :  {Math.round(weather.main.temp_min)}°c</h4>
            <h4>Humidity  :  {weather.main.humidity}</h4>
            <h4>Wind-speed  :  {Math.round(weather.wind.speed)}km/h</h4>
           <div className="weather"> {weather.weather[0].main}</div>
           <h3>({weather.weather[0].description})</h3>
          </div>
       </div>
      ):('')}
      </main>
    </div>
  );
}
    
export default App;
