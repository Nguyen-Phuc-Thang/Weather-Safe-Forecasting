# WEATHER SAFE FORECASTING 
Visit produciton website at: https://weather-safe-zeta.vercel.app/

## About Weather Safe Forecasting
This website forecasts extreme weather conditions, including: flood, flash flood, wind gust and thunderstorm

Enter a location and the website will forecast the weather conditions within 7 days. The website will display the weather statistics along with the charts for better visualization

A risk level is calculated for each extreme conditions at different days. There are 4 levels of emergencies: **Normal**, **Advisory**, **Warning**, and **Emergency/Danger**

For each risk level of each weather type, there will be a ***actionable advice*** section which will give users advices of what to do to deal with the upcoming weather conditions

## How it works
The website's information collection is based on two APIs of OpenMeteo
- Geocoding API (https://open-meteo.com/en/docs/geocoding-api)
- Weather Forecast API  (https://open-meteo.com/en/docs)

**Geocoding API** is used to convert the location name entered in the input box to lattitudes and longitudes values, which will then be used for forecasting at the location

**Weather Forecast API** is used for collecting weather data for calculation 

### Flood


### Flash Flood


### Wind Gust

### Thunderstorm