const apiKey = "76fa242dac2f1dd8eb119a8373e89be1"; //API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //API url

//the followings are variables for the input and button for the search box, and the icons that will appear according to the weather conditions
const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".icon")

async function weatherResults(city){ //this function is saying to will display the weather information that is in the API according to the city 

  
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // this is a variable the response is equal to the information that is fetch using the APIurl, the city and the APIkey

    if(response.status == 404){ //errror message, when the city is invalid do not display any weather information, just show the error message that is written in the html
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{ //the weather information of the city will be showned because there is no error
      
        var data = await response.json(); //the will wait until the result is read and analized using json() and then it would display the information

        document.querySelector(".city").innerHTML = data.name;  //this will display the name of the city      
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + "°C";//this will display the temperature in centigrades and will round it up
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; //this will display the humidity with %
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; // this will display the wind speed in km/h

        //the following is a consition to change the image being displayed in the box depending on the weather contidions (rain, drizzle, clear, snow, thunderstorm or clouds)
        if(data.weather[0].main == "Clouds"){
            icon.src = "img/cloudy.png";
        }
        else if(data.weather[0].main == "Clear"){
            icon.src = "img/sunny.png";
        }
        else if(data.weather[0].main == "Rain"){
            icon.src = "img/rainny.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            icon.src = "img/drizzle.png";
        }
        else if(data.weather[0].main == "Snow"){
            icon.src = "img/snowy.png";
        }
        else if(data.weather[0].main == "Thunderstorm"){
            icon.src = "img/stormy.png";
        }
        //this is calling the function. when there is an error display the error message and no weather details. 
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}
//when you click on the searchbox show the weather results
searchBtn.addEventListener("click", ()=>{
    weatherResults(searchBox.value);
})

