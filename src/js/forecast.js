import { daysOfWeek as daysOfWeek } from './constants';

import { forecastApi } from './apiUrls';

const today = new Date();

const getForcecast = (location) => {
    return fetch(`${forecastApi}&q=${location}&days=3&aqi=no&alerts=no`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => data);
};

const extraDayInfo = (data) => {
    const date = new Date(data.date);
    const dayName =
        date.getUTCDay() !== today.getUTCDay()
            ? daysOfWeek[date.getUTCDay()]
            : 'Today';
    const dayLowTemp = `${Math.round(data.day.mintemp_f)}°`;
    const dayHighTemp = `${Math.round(data.day.maxtemp_f)}°`;
    const dayIcon = data.day.condition.icon;
    return {
        dayName,
        dayIcon,
        dayLowTemp,
        dayHighTemp,
    };
};

const createDayContainer = (day) => {
    const row = document.createElement('div');
    row.classList.add('day-forecast__row');
    for (const [key, value] of Object.entries(day)) {
        const span = document.createElement('span');
        span.classList.add(`day-forecast__${key}`);
        if (key !== 'dayIcon') {
            span.innerText = value;
        } else {
            const img = new Image();
            img.src = value;
            span.appendChild(img);
        }
        row.appendChild(span);
    }
    return row;
};

const createForecast = async (location) => {
    const container = document.querySelector('.day-forecast');
    container.innerHTML = '';
    const forecastData = await getForcecast(location);
    let days = [];
    forecastData.forecast.forecastday.forEach((day) => {
        const dayContainer = extraDayInfo(day);
        days.push(dayContainer);
    });
    const docFragment = document.createDocumentFragment();
    console.log(days);
    for (let item in days) {
        const dayEl = createDayContainer(days[item]);
        // docFragment.appendChild(dayEl);
        container.appendChild(dayEl);
        dayEl.classList.add('show');
    }
};

export { createForecast };
