
//Переменные часы и календарь
const date = new Date();
let timeTime = document.querySelector('.time__time');
let timeDay = document.querySelector('.time__day');

//Переменные приветствия
let name = document.querySelector('.time__name');
let timeGreeting = document.querySelector('.time__greeting');

//Переменные фона
let body = document.querySelector('body');
let swiperPrev = document.querySelector('.swiper__prev');
let swiperNext = document.querySelector('.swiper__next');

//Переменные погоды
let weatherKey = '7de61897a092a321c372049b722f027d';
let weatherNameCity = document.querySelector('.weather__name-city');
let temperature = document.querySelector('.weather__temperature');
let wind = document.querySelector('.weather__wind');
let wet = document.querySelector('.weather__wet');
let weatherImg = document.querySelector('.weather__img');

//Переменнные цитат
let quotesReload = document.querySelector('.quotes__reload');
let quotesText = document.querySelector('.quotes__text');
let quotesAuthor = document.querySelector('.quotes__author');

//Переменные плеера
let playStart = document.querySelector('.play__start');
let playPrev = document.querySelector('.play__prev');
let playItem = document.querySelectorAll('.play__item');

//Часы и календарь

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
// Смена фона

let images = [
    'images/bg/01.jpg',
    'images/bg/02.jpg',
    'images/bg/03.jpg',
    'images/bg/04.jpg',
    'images/bg/05.jpg',
    'images/bg/06.jpg',
    'images/bg/07.jpg',
    'images/bg/08.jpg',
    'images/bg/09.jpg',
    'images/bg/19.jpg',
    'images/bg/11.jpg',
    'images/bg/12.jpg',
    'images/bg/13.jpg',
    'images/bg/14.jpg',
    'images/bg/15.jpg',
    'images/bg/16.jpg',
    'images/bg/17.jpg',
    'images/bg/18.jpg',
    'images/bg/19.jpg',
    'images/bg/20.jpg', 
];

function getRandomNum() {
    return Math.floor(Math.random() * (19 - 0)) + 0;
}

let randomNum = getRandomNum();

function setBg() {
    const img = new Image();
    img.src = images[getRandomNum()];
    console.log(img.src);
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`;
    })
    setTimeout(setBg, 100000);
}

function getSlideNext() {
    randomNum += 1;
    if(randomNum == 20) randomNum = 0;
    return randomNum;
}

function getSlidePrev() {
    randomNum -= 1;
    if(randomNum == -1) randomNum = 19;
    return randomNum;
}

setBg();

swiperPrev.addEventListener('click', () => {
    body.style.backgroundImage = `url(${images[getSlidePrev()]})`;
});

swiperNext.addEventListener('click', () => {
    body.style.backgroundImage = `url(${images[getSlideNext()]})`;
});
// ----------------------------

// Погода

weatherNameCity.value = 'Минск';

async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherNameCity.value}&lang=ru&appid=${weatherKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"</img>`;
    temperature.innerHTML = `${data.main.temp}&#176; ${data.weather[0].description}`;
    wind.innerHTML = `Скорость ветра ${data.wind.speed} м/c`;
    wet.innerHTML = `Влажность ${data.main.humidity}%`;
    setTimeout(getWeather, 1000);

  }
  getWeather()

  weatherNameCity.addEventListener('change', getWeather);

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('weatherNameCity', weatherNameCity.value);
  });

  window.addEventListener('load', () => {
    if(localStorage.getItem('weatherNameCity')) {
        weatherNameCity.value = localStorage.getItem('weatherNameCity');
    }
  });
// ----------------------------
// Цитаты

async function getQutes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let random = Math.round(0 - 0.5 + Math.random() * (data.length - 0 + 1));
    quotesText.textContent = data[random].text;
    quotesAuthor.textContent = data[random].author;
}

getQutes();
quotesReload.addEventListener('click', getQutes);

// ----------------------------
// Плеер
const playList = [
    {
        title: 'Aqua Caelestis',
        src: 'sounds/Aqua Caelestis.mp3',
    },
    {
        title: 'River Flow In You',
        src: 'sounds/River Flows In You.mp3',
    },
    {
        title: 'Summer Wind',
        src: 'sounds/Summer Wind.mp3',
    },
    {
        title: 'Ennio Morricone',
        src: 'sounds/Ennio Morricone.mp3',
    }
];

let isPlay = false;
const audio = new Audio();
let count = 0;

const playNext = document.querySelector('.play__next');

playNext.addEventListener('click', ()=> {
    if(count > playList.length - 1) count = 0;
    count++;
});

playPrev.addEventListener('click', ()=> {
    if(count == 0) count = playList.length;
    count--;
});


function player() {
    if(!isPlay) {
        audio.src = playList[count].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
}

function toggleBtn() {
    playStart.classList.toggle('play__stop');
}


const playlist = document.querySelector('.play__list');
function printPlayList() {
    playList.forEach(el => {
        let playItem = document.createElement('li');
        playlist.append(playItem);
        playItem.classList.add('play__item');
        playItem.textContent = el.title;
        console.log(el.title)
    })
}

printPlayList()

playStart.addEventListener('click', player);
playStart.addEventListener('click', toggleBtn);


