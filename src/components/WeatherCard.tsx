import React from 'react';
import PropTypes from 'prop-types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      <span className="muted">{DAYS[idx]}</span>
      <i className={`weather-icon wi wi-owm-${weatherId}`} />
      <div className="temps">
        <span>{Math.round(max)}&deg;</span>
        <span className="muted">{Math.round(min)}&deg;</span>
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
