import React from 'react';
import PropTypes from 'prop-types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

interface WeatherCardProps {
  time: number;
  min: number;
  max: number;
  weatherId: number;
}

export default function WeatherCard({
  time,
  min,
  max,
  weatherId,
}: WeatherCardProps) {
  const idx = new Date(time * 1000).getUTCDay();
  return (
    <div className="weather-card">
      <div className="weather-card-label">{DAYS[idx]}</div>
      <div className="weather-card-icon">
        <i className={`wi wi-owm-${weatherId}`} />
      </div>
      <div className="weather-card-temps">
        <div>{Math.round(max)}&deg;</div>
        <div>{Math.round(min)}&deg;</div>
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  time: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  weatherId: PropTypes.number.isRequired,
};
