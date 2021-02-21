import React, { useState, useEffect } from 'react';
import './App.css';
import './css/weather-icons.css';
import WeatherCard from './components/WeatherCard';

const API_KEY = process.env.REACT_APP_API_KEY;

interface Forecast {
  city: string;
  country: string;
  daily: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: {
      id: number;
    }[];
  }[];
  timezone_offset: number;
}

const useFetch = (query: string) => {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setForecast(null);
    setError(null);
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
        );
        const locations = await res1.json();

        if (!Array.isArray(locations) || locations.length === 0) {
          throw new Error('Location not found');
        }

        const { lat, lon, name, country } = locations[0];
        const res2 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=current,minutely,hourly,alerts&units=metric`,
        );
        localStorage.setItem('query', `${name},${country}`);
        setForecast({ ...(await res2.json()), city: name, country });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== '') {
      fetchData();
    }
  }, [query]);
  return { forecast, error, isLoading };
};

export default function App() {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState(localStorage.getItem('query') || '');

  const { forecast, error, isLoading } = useFetch(query);

  return (
    <>
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(location);
          setLocation('');
        }}
      >
        <label className="text-label" htmlFor="location">
          Location
          <input
            className="text-input"
            id="location"
            type="text"
            placeholder="e.g. Melbourne, AU"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </label>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      {isLoading && <div className="display-heading">Loading...</div>}
      {error && <div className="display-heading">{error.message}</div>}
      {forecast && (
        <>
          <h1 className="display-heading">{`${forecast.city}, ${forecast.country}`}</h1>
          <div className="grid-container">
            {forecast.daily.map(({ dt, temp, weather }) => {
              const time = dt + forecast.timezone_offset;
              const { min, max } = temp;
              const weatherId = weather[0].id;
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
        </>
      )}
    </>
  );
}
