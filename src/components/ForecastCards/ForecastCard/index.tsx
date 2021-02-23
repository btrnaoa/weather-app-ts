import React from 'react';
import './style.css';
import { DAYS } from '../../../common/date-utils';

interface ForecastCardProps {
  time: number;
  min: number;
  max: number;
  weatherId: number;
}

export default function ForecastCard({
  time,
  min,
  max,
  weatherId,
}: ForecastCardProps) {
  const idx = new Date(time * 1000).getUTCDay();
  return (
    <div className="forecast-card">
      <div className="forecast-card-label">{DAYS[idx].substring(0, 3)}</div>
      <div className="forecast-card-icon">
        <i className={`wi wi-owm-${weatherId}`} />
      </div>
      <div className="forecast-card-temps">
        <div>{Math.round(max)}&deg;</div>
        <div>{Math.round(min)}&deg;</div>
      </div>
    </div>
  );
}
