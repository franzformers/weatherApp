window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temparature-description');
  let locationTimezone = document.querySelector('.location-timezone'); 
  let temparatureDegree = document.querySelector('.degree');
  let weatherIcon = document.querySelector('.weather-icon');
  let degreeSection = document.querySelector('.degree-section');
  let temperatureSpan = document.querySelector('.degree-section span');


  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        // Get API from openweather website
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=28d00d7fac8a8259cbee369f0c264c43`;

        fetch(api)
          .then(response => {
            return response.json();
          } )
          .then(data => {
            console.log(data);
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const city = data.name;
            const country = data.sys.country;
            const icon = data.weather[0].icon;
            const cityCountry = `${city}, ${country}`;
            // Convert temp K to F
            let tempF = Math.floor((`${temp}` - 273.15) * (9/5) + 32)
            // Set DOM Elements from the API
            temparatureDegree.textContent = `${tempF}°`;
            temperatureDescription.textContent = description.toUpperCase();
            locationTimezone.textContent = cityCountry;
            weatherIcon.innerHTML = `<img src="icons/${icon}.png">`;

            // Convert temp F to C
            let tempC = Math.floor(`${temp}`- 273.15);
            degreeSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temparatureDegree.textContent = `${tempC}°`;
              } else {
                temperatureSpan.textContent = "F";
                temparatureDegree.textContent = `${tempF}°`;
              }
            })
            // Convert the UTC to local time
            const dateLocal = document.querySelector('.date-local');
            let unixTime = data.dt;
            let date = new Date(unixTime*1000);
            dateLocal.textContent = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

          });

      });

  } 

  


});