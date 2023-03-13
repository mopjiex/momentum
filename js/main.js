const time = document.querySelector('.time__title');
const timeDay = document.querySelector('.time__day');
const timeWelcome = document.querySelector('.time__welcome');
const timeWelcomeInput = document.querySelector('.time__welcome-input');
const body = document.querySelector('body');



function showTime() {
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');
    const seconds = document.querySelector('.seconds');

    let dayWeek = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        0: 'Воскресенье'
    }

    const date = new Date();
    let currentTime = date.toLocaleTimeString();
    let day = date.getDay();
    
    const options = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    }

    let currentDate = date.toLocaleDateString('ru-Ru', options);

    currentTime = currentTime.split(':')
    hours.textContent = currentTime[0];
    minutes.textContent = currentTime[1];
    seconds.textContent = currentTime[2];
    timeDay.textContent = `${dayWeek[day]}, ${currentDate}`;

    setTimeout(showTime, 1000);
}

showTime();

function setLocaleStorage() {
    localStorage.setItem('name', timeWelcomeInput.value);
    localStorage.setItem('weather', weatherInput.value);
}

window.addEventListener('beforeunload', setLocaleStorage);

function getLocaleStorage() {
    if(localStorage.getItem('name')) {
        timeWelcomeInput.value = localStorage.getItem('name');
    }

    if(localStorage.getItem('weather')) {
        weatherInput.value = localStorage.getItem('weather');
    }
}

window.addEventListener('load', getLocaleStorage);

function getTimeOfDay(hours) {
    switch(hours) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            return 1;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            return 2;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            return 3;
        case 24:
        case 1:
        case 2:
        case 3:
            return 4;
    }   

}


function showGreetings() {
    const date = new Date();
    const hours = date.getHours();
    if (getTimeOfDay(hours) === 1) return 'Доброе утро';
    else if (getTimeOfDay(hours) === 2) return 'Добрый день';
    else if (getTimeOfDay(hours) === 3) return 'Добрый вечер';
    return 'Доброй ночи';
}


function showHours() {
    timeWelcome.textContent = `${showGreetings()}, `;
    setTimeout(showHours, 1000);
}

showHours()


function getImagesTimesOfDay() {
    const date = new Date();
    const hours = date.getHours();
    
    if(getTimeOfDay(hours) == 1) return 'https://raw.githubusercontent.com/mopjiex/Momentum-Images/main/images/morning/';
    else if (getTimeOfDay(hours) == 2) return 'https://raw.githubusercontent.com/mopjiex/Momentum-Images/main/images/afternoon/';
    else if (getTimeOfDay(hours) == 3) return 'https://raw.githubusercontent.com/mopjiex/Momentum-Images/main/images/evening/';
    else  return 'https://raw.githubusercontent.com/mopjiex/Momentum-Images/main/images/nigth/';
}

function getRandomNum() {
    return Math.round(1 - 0.5 + Math.random() * (20 - 1 + 1));
}

function randomPad(num) {
    return num < 10 ? String(num).padStart(2, 0) : num;
}

let random = randomPad(getRandomNum());
let currentImg;
let nextImg;

function setBg() {
    let bgNum = `${getImagesTimesOfDay()}${random}.webp`;
    const img = new Image();
    img.src = bgNum;
    img.addEventListener('load', () => {
        body.style.background = `url(${img.src})`;
    })
    
}

setBg();


const sliderNext = document.querySelector('.slider__next');
const sliderPrev = document.querySelector('.slider__prev');

function getSliderNext() {
    random = Number(random);
    if(random >= 20) {
        random = 0;
    }
    random++;
    random = randomPad(random);
    body.style.background = `url(${getImagesTimesOfDay()}${random}.webp)`;
}

function getSliderPrev() {
    random = Number(random);
    if(random <= 1) {
        random = 21;
    }

    random--;
    random = randomPad(random);
    body.style.background = `url(${getImagesTimesOfDay()}${random}.webp)`;
}

sliderNext.addEventListener('click', getSliderNext);
sliderPrev.addEventListener('click', getSliderPrev);

const weatherInput = document.querySelector('.weather__input');

weatherInput.value = 'Минск';

async function  getWeather() {
    const weatherTemperature = document.querySelector('.weather__temperature');
    const weatherWind = document.querySelector('.weather__wind');
    const weatherHumidity = document.querySelector('.weather__humidity');
    const token = 'c8032082b518e187edfde3b4330a7aa6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&lang=ru&appid=${token}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherTemperature.innerHTML = `${Math.floor(data.main.temp)} 
                                    <img src='./images/weather/weather-celsius.png'>
                                    <span>${data.weather[0].description}</span>
                                    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
    weatherWind.innerHTML = `Скорость ветра: ${Math.floor(data.wind.speed)}м/c`;
    weatherHumidity.innerHTML = `Влажность: ${data.main.humidity}%`
    setTimeout(getWeather, 1000);
}

getWeather();
weatherInput.addEventListener('change', getWeather);

const quotesImg = document.querySelector('.quotes__img');

async function getQuotes() {
    const quotesText = document.querySelector('.quotes__text');
    const quotesAuthor = document.querySelector('.quotes__author');
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const random = Math.floor(0 + Math.random() * ((data.length - 1) + 1 - 0));
    quotesText.textContent = `${data[random].text}`;
    quotesAuthor.textContent = `${data[random].author}`;
}

getQuotes();
quotesImg.addEventListener('click', getQuotes);


const playList = [
    {
        title: 'Independence Day',
        src: './music/Mindless-Faith.mp3',
        duration: '05:34',
    },
    {
        title: 'DMC 12 Gauge',
        src: './music/Red-marker.mp3',
        duration: '3:44',
    },
    {
        title: 'need to be strong',
        src: './music/need-to-be-strong.mp3',
        duration: '3:06',
    },
    {
        title: 'Levi vs Survey corps Theme',
        src: './music/levi-vs-survey-corps-theme.mp3',
        duration: '04:36',
    }
]



const play = document.querySelector('.play-play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');

const playListUl = document.querySelector('.playlist__list');

function showPlayList() {
    playList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.classList.add('playlist__item')
        playListUl.append(li);
    })
}

showPlayList();


function reloadPlayerImg() {
    if(play.classList.contains('play-img')) {
        play.classList.remove('play-img');
        play.src = './images/playersImg/pause.svg'
    } else {
        play.classList.add('play-img');
        play.src = './images/playersImg/play.svg';
    }
}


const audio = new Audio();
const musicVolume = document.querySelector('.music__volume');
const playBar = document.querySelector('.play__bar');
let startTime = 0;

let isPlay = false;
let musicCount = 0;

function playAudio() {
    audio.src = playList[musicCount].src;
    audio.currentTime = 0;
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

function plays() {
    reloadPlayerImg();
    if(!isPlay) {
        playAudio();
        isPlay = true;
    } else {
        pauseAudio();
        isPlay = false;
    }
}

function prevPlay() {
    let lengthMusic = playList.length - 1;
    if(musicCount <= 0) {
        musicCount = lengthMusic;
    } else {
        musicCount--;
    }
    
    playAudio()
}

function nextPlay() {
    let lengthMusic = playList.length - 1;
    if(musicCount >= lengthMusic) {
        musicCount = 0;
    } else {
        musicCount++;
    }
    
    playAudio()
}

function changeVolume() {
    audio.volume = musicVolume.value / 100;

}

play.addEventListener('click', plays)
playNext.addEventListener('click', nextPlay)
playPrev.addEventListener('click', prevPlay);
musicVolume.addEventListener('change', changeVolume);
audio.addEventListener('loadedmetadata', ()=> {
    playBar.max = audio.duration;
})

audio.addEventListener('timeupdate', ()=> {
    const currentTimeText = document.querySelector('.current-time__text');
    
    const currentTime = audio.currentTime - startTime;
    currentTimeText.textContent = currentTime.toFixed(2);
})

audio.addEventListener('play', () => {
    startTime = audio.currentTime;
});
playBar.addEventListener('input', ()=> {
    audio.currentTime = playBar.value;
})
audio.addEventListener('ended', ()=>nextPlay());
