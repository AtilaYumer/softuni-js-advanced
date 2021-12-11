function attachEventsListeners() {
    const inputs = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    }
    document.querySelector('main').addEventListener('click', (event) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'button') {
            const value = event.target.parentNode.children[1].value;
            const measure = event.target.parentNode.children[1].id;
            const result = convert(value, measure);
            for (const key of Object.keys(result)) {
                inputs[key].value = result[key];
            }
        }
    });

    function convert(value, measure) {
        const day = {
            days: 1,
            hours: 24,
            minutes: 1440,
            seconds: 86400
        }

        const days = value / day[measure];
        return {
            days: days,
            hours: days * day.hours,
            minutes: days * day.minutes,
            seconds: days * day.seconds
        }
    }
}