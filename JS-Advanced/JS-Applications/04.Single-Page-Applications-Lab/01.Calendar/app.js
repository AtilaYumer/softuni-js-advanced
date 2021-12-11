const yearsSection = document.getElementById('years');

const years = [...document.querySelectorAll('.monthCalendar')].reduce((acc, s) => {
    acc[s.id] = s;
    return acc;
}, {})

const months = [...document.querySelectorAll('.daysCalendar')].reduce((acc, s) => {
    acc[s.id] = s;
    return acc;
}, {});

const monthNumbers = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sept: 9, Oct: 10, Nov: 11, Dec: 12
}

document.body.innerHTML = '';
document.body.appendChild(yearsSection);

document.body.addEventListener('click', onClick);

function onClick(event) {
    if (event.target.tagName === 'TD' || (event.target.tagName === 'DIV' && event.target.className === 'date')) {
        const value = event.target.textContent.trim();
        let parentNode = event.target.parentNode;
        while (parentNode.tagName !== 'SECTION') {
            parentNode = parentNode.parentNode;
        }
        if (parentNode.className === 'daysCalendar') {
            return;
        }
        if (parentNode.id === 'years') {
            showSection(years[`year-${value}`])
        } else {
            showSection(months[`${parentNode.id.replace('year', 'month')}-${monthNumbers[value]}`]);
        }
    } else if (event.target.tagName === 'CAPTION') {
        const value = event.target.textContent.trim().split(' ')[1];
        let parentNode = event.target.parentNode;
        while (parentNode.tagName !== 'SECTION') {
            parentNode = parentNode.parentNode;
        }
        if (parentNode.className === 'daysCalendar') {
            showSection(years[`year-${value}`]);
        } else if (parentNode.className === 'monthCalendar') {
            showSection(yearsSection);
        }
    }
}

function showSection(section) {
    document.body.innerHTML = '';
    document.body.appendChild(section);
}

