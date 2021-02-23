export interface WeatherData {
  city: string;
  country: string;
  current: CurrentWeatherData;
  daily: DailyForecast[];
  timezone_offset: number;
}

export interface CurrentWeatherData {
  dt: number;
  temp: number;
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
}

export interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    id: number;
  }[];
}
