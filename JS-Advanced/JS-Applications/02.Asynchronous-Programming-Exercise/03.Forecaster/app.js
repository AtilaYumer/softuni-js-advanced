const symbols = {
    Sunny: '\u2600',
    'Partly sunny': '\u26C5',
    Overcast: '\u2601',
    Rain: '\u2614',
    Degrees: '\u00B0'
}

function attachEvents() {
    const button = document.getElementById('submit');
    const location = document.getElementById('location');

    const currentDiv = document.getElementById('current');
    const forecastDiv = document.getElementById('forecast');
    const currentForecastDiv = document.getElementById('current');
    const upcomingForecastDiv = document.getElementById('upcoming');

    button.addEventListener('click', async () => {
        try {
            button.disabled = true;
            button.value = 'Loading...';

            let locations = await getLocations();
            const code = findCode(location.value, locations);
            const todayForecast = await getTodayForecast(code);
            const upcomingForecast = await getUpcomingForecast(code);

            clearForecastContent(currentForecastDiv, upcomingForecastDiv);

            currentForecastDiv.appendChild(composeCurrentForecast(todayForecast));
            upcomingForecastDiv.appendChild(composeUpcomingForecast(upcomingForecast))

            forecastDiv.style.display = 'block';
        } catch (error) {
            if (forecastDiv.style.display === 'none') {
                forecastDiv.style.display = 'block';
            }
            if (document.querySelector('.forecasts')) {
                document.querySelector('.forecasts').style.display = 'none';
            }
            upcomingForecastDiv.style.display = 'none';
            currentDiv.firstElementChild.textContent = error.message;
        } finally {
            button.value = 'Get Weather';
            button.disabled = false;
        }
    });
}

async function getLocations() {
    let response = await fetch('http://localhost:3030/jsonstore/forecaster/locations');
    validateResponse(response);
    return await response.json();
}

function findCode(location, locations) {
    let find = locations.find(l => l.name.toUpperCase() === location.toUpperCase());
    if (!find) {
        throw new Error('Error');
    }
    return find.code;
}

async function getTodayForecast(code) {
    const response = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
    validateResponse(response);
    return await response.json();
}

async function getUpcomingForecast(code) {
    const response = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
    validateResponse(response);
    return await response.json();
}

function composeCurrentForecast(currentForecast) {
    const forecast = currentForecast.forecast;
    return createElement('div', {className: 'forecasts'},
        createElement('span', {className: 'condition symbol'}, symbols[forecast.condition]),
        createElement('span', {className: 'condition'}, ...createForecastSpans(currentForecast.name, forecast)));
}

function composeUpcomingForecast(upcomingForecast) {
    return createElement('div', {className: 'forecast-info'}, ...createUpcomingForecasts(upcomingForecast));
}

function createUpcomingForecasts(upcomingForecasts) {
    const spans = [];
    upcomingForecasts.forecast.forEach(forecast => {
        spans.push(createElement('span', {className: 'upcoming'},
            ...createForecastSpans(upcomingForecasts.name, forecast, true)));
    });
    return spans;
}

function createForecastSpans(name, forecast, upcoming) {
    return [
        createElement('span', {className: upcoming ? 'symbol' : 'forecast-data'}, upcoming ? symbols[forecast.condition] : name),
        createElement('span', {className: 'forecast-data'}, `${forecast.low}${symbols.Degrees}/${forecast.high}${symbols.Degrees}`),
        createElement('span', {className: 'forecast-data'}, forecast.condition)
    ]
}

function validateResponse(response) {
    const contentType = response.headers.get("content-type");
    if (response.status !== 200 || (contentType && contentType.indexOf('application/json') === -1)) {
        throw new Error('Error');
    }
}

function clearForecastContent(currentForecastDiv, upcomingForecastDiv) {
    currentForecastDiv.firstElementChild.textContent = 'Current conditions';
    upcomingForecastDiv.style.display = 'block';
    if (currentForecastDiv.querySelector('.forecasts')) {
        currentForecastDiv.querySelector('.forecasts').remove();
    }
    if (upcomingForecastDiv.querySelector('.forecast-info')) {
        upcomingForecastDiv.querySelector('.forecast-info').remove();
    }
}

function createElement(type, attributes, ...contents) {
    const element = document.createElement(type);
    for (const [attribute, value] of Object.entries(attributes)) {
        element[attribute] = value;
    }
    contents.forEach(content => {
        if (typeof (content) === 'string' || typeof (content) === 'number') {
            element.textContent = content;
        } else {
            element.appendChild(content);
        }
    });
    return element;
}

attachEvents();