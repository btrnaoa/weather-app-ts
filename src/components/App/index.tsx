import React, { useState } from 'react';
import WeatherCard from '../WeatherCard';
import SearchForm from '../SearchForm';
import ForecastCards from '../ForecastCards';
import { useFetch } from './hooks';

export default function App() {
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState(localStorage.getItem('query') || '');

  const { weatherData, error, isLoading } = useFetch(query);

  const Cards = () => {
    if (weatherData) {
      const {
        city,
        country,
        current,
        daily,
        timezone_offset: timezoneOffset,
      } = weatherData;
      return (
        <>
          <WeatherCard
            weatherData={current}
            location={`${city}, ${country}`}
            timezoneOffset={timezoneOffset}
          />
          <ForecastCards forecast={daily} timezoneOffset={timezoneOffset} />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <SearchForm
        location={location}
        handleSubmit={(event) => {
          event.preventDefault();
          setQuery(location);
          setLocation('');
        }}
        handleChange={(event) => setLocation(event.target.value)}
      />
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        {isLoading && 'Loading...'}
        {error && error.message}
      </div>
      <Cards />
    </>
  );
}
