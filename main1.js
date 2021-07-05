function getGif(situation){
    fetch(`https://api.giphy.com/v1/gifs/search?q=${situation}&api_key=ikx4gLH4KsZv6gSWn7Etq3j5GbZla8mC&limit=5`)
    .then(response => response.json())
    .then(j => {
        let bg = j.data[0].images.original.url
        console.log(bg)
        let element = document.querySelector("body");
        element.style.background =  `url('${bg}') no-repeat center /2500px`
    })
}


function getData(){
    const key = '127b25a724bbb3c4e530771adc689d7e'
    let query = document.getElementById('city').value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`)
    .then(response => response.json())
    .then(data => { 
    let humidity = data.main.humidity
    let temp_max = Math.round((data.main.temp_max - 273.15) * 9/5 + 32)
    let temp_min = Math.round((data.main.temp_min - 273.15) * 9/5 + 32)
    let forecast = data.weather[0].description
      
    createHTML(forecast, temp_max, temp_min, humidity)
    
    document.getElementById("formy").remove();
    
    if (humidity > 85){
        getGif('storm+anger')
    }
    else if (temp_max <= 45){
        getGif('china+snow')
    }else if (temp_max <= 100 && temp_max >= 90){
        getGif('jim+cantore+sunshine')
    }else if (temp_max <= 89 && temp_max >= 80){
        getGif('san+audreyobscura')
    }else if (temp_max <= 79 && temp_max >= 70){
        getGif('spring+audreyobscura')
    }else if (temp_max <= 69 && temp_max >= 60){
        getGif('storm+hurricane+gif')    
    }else if (temp_max >= 46 && temp_max <= 59){
        getGif('freezing+rain') 
    }else{
        getGif('jason+windy+big+brother')
    }
   })
}

const createHTML = (f, t1, t2, h) => {
    const html = `<p>&nbsp;today: ${f}</p><p>\n&nbsp;high: ${t1}°</p> <p>\n&nbsp;low: ${t2}°</p><p>\n&nbsp;humidity: ${h}%</p>`;
    document.getElementById('content').insertAdjacentHTML('beforeend', html)
}

document.getElementById("submitButton").onclick = function() {
    getData();
    return false
}

function refreshPage(){
    window.location.reload();
} 

