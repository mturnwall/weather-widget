import './styles/main.scss';

import {APIKey} from './constants';
import { createForecast, forecastAPI } from './forecast';

const currentConditionsAPI = `http://api.weatherapi.com/v1/current.json?key=${APIKey}`;


const getCurrentConditions = (location) => {
    return fetch(`${forecastAPI}&q=${location}&days=1&aqi=no&alerts=no`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => data);
};

const writeCurrentConditions = (location) => {
    const gettingConditions = getCurrentConditions(location);
    const currentEl = document.querySelector('.current');
    gettingConditions.then((weatherData) => {
        const currentWeather = weatherData.current;
        const forecast = weatherData.forecast.forecastday[0];

        const locationEl = document.querySelector('.current__location');
        const currentTempValueEl = document.querySelector(
            '.current__temp-value',
        );
        const currentConditionEl = document.querySelector(
            '.current__condition',
        );

        // build current conditions
        locationEl.innerHTML = weatherData.location.name;
        currentTempValueEl.innerHTML = Math.round(currentWeather.temp_f);
        const conditionImg = new Image();
        conditionImg.src = currentWeather.condition.icon;
        currentConditionEl.innerHTML = currentWeather.condition.text;
        currentConditionEl.append(conditionImg);

        // build the days forecast
        const tempHighEl = document.querySelector('.current__high-value');
        const tempLowEl = document.querySelector('.current__low-value');
        tempHighEl.innerHTML = Math.round(forecast.day.maxtemp_f);
        tempLowEl.innerHTML = Math.round(forecast.day.mintemp_f);
        // currentEl.classList.toggle('showWeather');
    });
};

document.addEventListener('DOMContentLoaded', function loadPageEvents() {
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', function (evt) {
        const locationValue = searchForm.querySelector(
            '.search-form__location',
        );
        writeCurrentConditions(locationValue.value);
        createForecast(locationValue.value);
        evt.preventDefault();
    });

    document.removeEventListener('DOMContentLoaded', loadPageEvents);
});
