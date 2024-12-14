const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "37f04dce39292535ca2257d1664d143b",
}

let wether = {};
let minClass="";
const conatiner = document.getElementById("conatiner_k");
const loc = document.getElementById("location");
const date = document.getElementById("date");
const temperature_current = document.getElementById("temperature_current");
const temperature_max_min = document.getElementById("temperature_max_min");
const weather = document.getElementById("weather");
const weather_desc = document.getElementById("weather_desc");




document.addEventListener("readystatechange", (e)=>{
    if(e.target.readyState == "complete"){
        console.log("llllllllllllll");
        
        AddSershListner();
    }


})
const AddSershListner=()=>{
    let location_inout=document.getElementById("location_inout");
    location_inout.addEventListener("keypress",(e)=>{
        if(e.key==="Enter"){
            getWeatherData (location_inout.value);
       }
    });
};

const getWeatherData = (city) => {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((result) => {
            // console.log(result);
            fill_data(result);
        })

};
const fill_data = (wether) => {
    minClass=
    typeof wether.main !=undefined ?wether.main.temp>18?"hot":"cold" :"";
    conatiner.className=minClass;
    loc.textContent = wether.name + " , " + wether.sys.country;
    date.textContent = dateBuild(new Date());
    temperature_current.textContent =
        "Current Temparature" + Math.round(wether.main.temp) + "°C";
    temperature_max_min.textContent =
        "High:" +
        Math.round(wether.main.temp_max) +
        "°C /Low:" +
        Math.round(wether.main.temp_min) +
        "°C";
    weather.textContent = wether.wether[0].main;
    weather_desc.textContent =
        wether.wether[0].description + " , wind speed is" + wether.wind.speed;
};

const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
}
