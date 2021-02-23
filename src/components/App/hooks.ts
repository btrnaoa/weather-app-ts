import { useState, useEffect } from 'react';
import { WeatherData } from '../../common/types';

const { REACT_APP_API_KEY } = process.env;

// eslint-disable-next-line import/prefer-default-export
export const useFetch = (query: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setWeatherData(null);
    setError(null);
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${REACT_APP_API_KEY}`,
        );
        const locations = await res1.json();

        if (!Array.isArray(locations) || locations.length === 0) {
          throw new Error('Location not found');
        }

        const { lat, lon, name, country } = locations[0];
        const res2 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${REACT_APP_API_KEY}&exclude=minutely,hourly,alerts&units=metric`,
        );
        localStorage.setItem('query', `${name},${country}`);
        setWeatherData({ ...(await res2.json()), city: name, country });
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
  return { weatherData, error, isLoading };
};
