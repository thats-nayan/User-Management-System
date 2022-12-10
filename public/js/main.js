// C:\Program Files\MongoDB\Server\6.0\data\
const submitBtn = document.querySelector("#submitBtn");
const day = document.querySelector("#day");
const today_date = document.querySelector("#today_date");
const cityName = document.querySelector("#cityName");
const output = document.querySelector("#city_name");
const temp = document.querySelector("#temp");
let temp_status = document.querySelector("#temp_status");

const currTime = new Date();
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
day.textContent = days[currTime.getDay()-1];
today_date.textContent = currTime.getDate()+" "+month[currTime.getMonth()];

const getinfo = (event) =>{
    event.preventDefault();
    if(cityName.value == "")
    {
        output.innerHTML = "City Name cannot be Empty";
        return ;
    }
    // alert(cityName.value);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=1d93013ec716cec2da388b4db11d135d`)
            .then((res) => res.json())
            .then((data) => {
                output.innerHTML = data.weather[0].main ;
                temp.innerHTML = Math.floor(data.main.temp - 273)+ "&deg;"+"C";
                const icon = data.weather[0].icon;
                const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                temp_status.innerHTML = "<img src = '" +imgurl+"'>";
            })
            .catch((error) => {
                temp.innerHTML = "";
                    output.innerHTML = "City does not exists";
                    temp_status = '<i class="fa-regular fa-face-sad-sweat"></i>';
            })
}
submitBtn.addEventListener("click",getinfo);