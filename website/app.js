/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=7c92e8049f06a7eb97a4014d0033586a";
const kelToCel = 273.5;
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const genBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getData = async (url = '/all') => {
    const res = await fetch(url)
    try{
        const data = await res.json();
        console.log(data);
    }catch(error){
        console.log('error', error);
    }
}

const getWeatherDataByZip = async (baseUrl, zip, apiKey) => {
    const res = await fetch(baseUrl + zip + apiKey)
        if(!res.ok){
            alert('city not found.')
            throw new Error('zipcode does not exist.')
        }
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('error', error.cod);
        
    }
}

const postData = async (url = '', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error', error);
    }
}

const updateUI = async() => {
    const res = await fetch('/all');
    try{
        const allData = await res.json();
        console.log('update-UI');
        date.innerHTML = allData.date;
        temp.innerHTML = `${Math.round(allData.temperature - kelToCel)}\u2103`;
        content.innerHTML = allData.userRes;
    }catch(error){
        console.log('error', error);
    }
}

genBtn.addEventListener('click', () => {
    const zipCord = zip.value;
    const userRes = feelings.value;
    getWeatherDataByZip(baseUrl, zipCord, apiKey)
    .then(data => {
        const mdata = {
            temperature: data.main.temp,
            date: newDate,
            userRes: userRes
        }
        postData('/addWeather', mdata);
    })
    .then(() =>
        updateUI()
        )
});