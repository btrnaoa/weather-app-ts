import React, { useState, useEffect } from 'react';
import './App.css';
import './css/weather-icons.css';
import WeatherCard from './components/WeatherCard';

const API_KEY = process.env.REACT_APP_API_KEY;

interface CurrentWeatherData {
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  id: number;
  message: string;
  name: string;
  sys: {
    country: string;
  };
}

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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res1 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`,
        );
        const data: CurrentWeatherData = await res1.json();
        const { cod, message, coord, name, sys } = data;

        if (cod !== 200 && message) {
          throw new Error(message);
        }

        const { lon, lat } = coord;
        const res2 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=current,minutely,hourly,alerts&units=metric`,
        );
        setForecast({
          ...(await res2.json()),
          city: name,
          country: sys.country,
        });
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
  return { forecast, error, isLoading };
};

export default function App() {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(location.trim());
    setLocation('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const { forecast, error } = useFetch(query);

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
      {error && (
        <div className="error-badge">
          <span>{error.message}</span>
        </div>
      )}
      {forecast && (
        <>
          <span className="heading">
            {`${forecast.city}, ${forecast.country}`}
          </span>
          <div className="container">
            {forecast.daily.map((item) => {
              const time = item.dt + forecast!.timezone_offset;
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
        </>
      )}
    </div>
  );
}
