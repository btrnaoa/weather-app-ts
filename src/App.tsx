import React, { useState } from 'react';
import './App.css';
import './css/weather-icons.css';
import WeatherCard from './components/WeatherCard';

export default function App() {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="App">
      <form className="location-form" onSubmit={handleSubmit}>
        <label htmlFor="location">
          Location
          <input
            className="text-input"
            type="text"
            id="location"
            placeholder="e.g. Melbourne, AU"
            value={location}
            onChange={handleChange}
          />
        </label>
        <input className="btn" type="submit" value="Go" />
      </form>
      <div className="container">
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </div>
    </div>
  );
}
