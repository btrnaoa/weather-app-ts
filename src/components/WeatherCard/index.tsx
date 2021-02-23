import React from 'react';
import './style.css';
import { formatUTCDateString } from '../../common/date-utils';
import { CurrentWeatherData } from '../../common/types';

interface WeatherCardProps {
  location: string;
  weatherData: CurrentWeatherData;
  timezoneOffset: number;
}

export default function WeatherCard({
  weatherData,
  location,
  timezoneOffset,
}: WeatherCardProps) {
  const { dt, temp, weather } = weatherData;
  const { id, description } = weather[0];
  return (
    <div className="weather-card">
      <div className="weather-card-temp">{Math.round(temp)}&deg;</div>
      <div className="weather-card-icon">
        <i className={`wi wi-owm-${id}`} />
      </div>
      <h1 className="weather-card-heading">{location}</h1>
      <div>{formatUTCDateString(dt + timezoneOffset)}</div>
      <div className="weather-card-description">{description}.</div>
    </div>
  );
}
