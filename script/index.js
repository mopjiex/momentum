
//Часы и календарь
const date = new Date();
let timeTime = document.querySelector('.time__time');
let timeDay = document.querySelector('.time__day');

function showDate() {
    const options = {month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    const day = {
        0: 'Воскресенье',
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
    }

    timeDay.textContent = `${day[date.getDay()]}, ${currentDate}`;
}

function showTime()  {
    const currentTime = date.toLocaleString();
    let time = currentTime.slice(12);
    timeTime.textContent = `${time[0]}${time[1]}:${time[3]}${time[4]}:${time[6]}${time[7]}`; 
    showDate();
    setTimeout(showTime, 1000);  
}

showTime();

// ----------------------------
//Приветствие

let name = document.querySelector('.time__name');
let timeGreeting = document.querySelector('.time__greeting');

function setLocaleStorage() {
    localStorage.setItem('name', name.value);
}

window.addEventListener('beforeunload', setLocaleStorage);

function getLocaleStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}

window.addEventListener('load', getLocaleStorage);

function getTimeOfDay() {
    let hours = date.getHours();

    switch(hours) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            return 'Доброе утро';
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            return 'Добрый день';
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            return 'Добрый вечер';
        case 24:
        case 1:
        case 2:
        case 3:
            return 'Доброй ночи';
    }
}

function showGreeting() {
    timeGreeting.textContent = `${getTimeOfDay()}, `;
    setTimeout(showGreeting, 1000);  
}

showGreeting();

// ----------------------------