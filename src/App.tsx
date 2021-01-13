import React, { useState, useEffect } from 'react';
import './App.css';
import './css/weather-icons.css';
import WeatherCard from './components/WeatherCard';

const API_KEY = process.env.REACT_APP_API_KEY;

interface Forecast {
  timezone_offset: number;
  daily: Daily[];
}

interface Daily {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: Weather[];
}

interface Weather {
  cod: number;
  message: string;
  coord: {
    lon: number;
    lat: number;
  };
  sys: {
    country: string;
  };
  name: string;
  id: number;
}

const useFetch = (query: string) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setError(null);
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`,
        );
        const weather: Weather = await response1.json();

        const { cod, message } = weather;
        if (cod !== 200 && message) {
          throw new Error(message);
        }

        const { lon, lat } = weather.coord;
        setCity(weather.name);
        setCountry(weather.sys.country);

        // One Call API only accepts lat long coords so I used OWM's other API to get the coords by city name instead of signing up for another API key just for geocoding 😬
        const response2 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=current,minutely,hourly,alerts&units=metric`,
        );
        const json = await response2.json();
        setForecast(json);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== '') {
      fetchData();
    }
  }, [query]);
  return { city, country, forecast, error, isLoading };
};

export default function App() {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(location);
    setLocation('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const weather = useFetch(query);

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
      <div className="status">
        {!weather.error
          ? !weather.isLoading && `${weather.city}, ${weather.country}`
          : weather.error.message}
      </div>
      <div className="container">
        {weather.forecast?.daily.map((item) => {
          const time = item.dt + weather.forecast!.timezone_offset;
          const { min, max } = item.temp;
          const weatherId = item.weather[0].id;
          return (
            <WeatherCard
              key={time}
              time={time}
              min={min}
              max={max}
              weatherId={weatherId}
            />
          );
        })}
      </div>
    </div>
  );
}
