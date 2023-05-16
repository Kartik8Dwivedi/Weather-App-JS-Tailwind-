
const apikey = "b3c4c4f41ca6f02c33e2c0b1f51b1c6c";
const apikey2 = "46f80a02ecae410460d59960ded6e1c6";
const site = "http://openweathermap.org/img/wn/01d.png"

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("inputField");
const fromEl = document.querySelector("form");

fromEl.addEventListener("submit", (event) => {
    event.preventDefault(); //prevents the refreshing nature of page on submit
    const cityValue = cityInputEl.value;
    console.log(cityValue);
    getWeatherData(cityValue);
})

async function getWeatherData(value){
    try{


        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apikey2}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}`,
        ]


        // console.log(weatherDataEl.innerHTML);
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" class="h-20" alt="Weather Icon">`

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`

        weatherDataEl.querySelector(".description").textContent = description

        let fl = "";
        let h = "";
        let ws = "";

        details.map((detail) => {
            if(detail.charAt(0)=="F") fl=detail;
            if(detail.charAt(0)=="H") h=detail;
            if(detail.charAt(0)=="W") ws=detail;
        })
        console.log("fl: "+fl+"h: "+h+"ws: "+ws);
        weatherDataEl.querySelector(".details-end").innerHTML = 
        `
        <div class="w-[30%] h-[70px] flex justify-center items-center text-lg bg-slate-300 rounded-sm"> ${fl}</div>
        <div class="w-[30%] h-[70px] flex justify-center items-center text-lg bg-slate-300 rounded-sm"> ${h}</div>
        <div class="w-[30%] h-[70px] flex justify-center items-center text-lg bg-slate-300 rounded-sm"> ${ws} m/s</div>
        
        `

    }catch(error){
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").innerHTML = `<div class="mb-10 text-xl">No Data Found<div/>`
        weatherDataEl.querySelector(".details-end").textContent = "";
    }
}