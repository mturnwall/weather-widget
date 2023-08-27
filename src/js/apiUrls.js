import { APIKey } from './constants';

const apiPrefix = 'http://api.weatherapi.com/v1';

const forecastApi = `${apiPrefix}/forecast.json?key=${APIKey}`;
const locationSearchApi = `${apiPrefix}/ip.json?key=${APIKey}`;

export { locationSearchApi, forecastApi };
