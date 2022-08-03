
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

