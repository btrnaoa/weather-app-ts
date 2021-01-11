import React from 'react';

export default function WeatherCard() {
  return (
    <div className="weather-card">
      <span className="muted">Mon</span>
      <i className="weather-icon wi wi-owm-200" />
      <div className="temps">
        <span>24&deg;</span>
        <span className="muted">12&deg;</span>
      </div>
    </div>
  );
}
