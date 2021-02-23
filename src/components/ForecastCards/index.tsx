import React from 'react';
import './style.css';
import ForecastCard from './ForecastCard';
import { DailyForecast } from '../../common/types';

export default function ForecastCards({
  forecast,
  timezoneOffset,
}: {
  forecast: DailyForecast[] | null;
  timezoneOffset: number;
}) {
  if (forecast) {
    return (
      <div className="grid-container">
        {forecast.map(({ dt, temp, weather }) => {
          const time = dt + timezoneOffset;
          const { min, max } = temp;
          const weatherId = weather[0].id;
          return (
            <ForecastCard
              key={time}
              time={time}
              min={min}
              max={max}
              weatherId={weatherId}
            />
          );
        })}
      </div>
    );
  }
  return null;
}
