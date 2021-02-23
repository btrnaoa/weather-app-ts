import React from 'react';
import './style.css';

export default function SearchForm({
  location,
  handleSubmit,
  handleChange,
}: {
  location: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form-label" htmlFor="location">
        Location
        <input
          className="search-form-input"
          id="location"
          type="text"
          placeholder="e.g. Melbourne, AU"
          value={location}
          onChange={handleChange}
          required
        />
      </label>
      <button className="search-form-btn" type="submit">
        Search
      </button>
    </form>
  );
}
