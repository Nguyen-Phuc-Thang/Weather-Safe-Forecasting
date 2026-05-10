// Geocoding API
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const lat = searchParams.get('latitude');
        const lng = searchParams.get('longitude');

        if (!lat || !lng) {
            return NextResponse.json({ error: 'Missing latitude or longitude', status: 400 });
        }

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=precipitation,precipitation_probability,rain,showers,soil_moisture_3_to_9cm,wind_gusts_10m,wind_speed_10m,wind_direction_10m,weather_code,surface_pressure,cloud_cover`);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        const units: Object = data.hourly_units;

        let time: string[] = data.hourly.time.map((timeString: string) => {
            const date = new Date(timeString);
            return date.toLocaleString('en-US', {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                hour12: true
            }).replace(" at ", " ");
        });

        const precipitation: number[] = data.hourly.precipitation;
        const precipitation_probability: number[] = data.hourly.precipitation_probability;
        const rain: number[] = data.hourly.rain;
        const showers: number[] = data.hourly.showers;
        const soil_moisture_3_to_9cm: number[] = data.hourly.soil_moisture_3_to_9cm;
        const wind_gusts_10m: number[] = data.hourly.wind_gusts_10m;
        const wind_speed_10m: number[] = data.hourly.wind_speed_10m;
        const wind_direction_10m: number[] = data.hourly.wind_direction_10m;
        const weather_code: number[] = data.hourly.weather_code;
        const surface_pressure: number[] = data.hourly.surface_pressure;
        const cloud_cover: number[] = data.hourly.cloud_cover;

        let weatherData: Object[] = [];


        for (let i = 0; i < time.length; i++) {
            weatherData.push({
                time: time[i],
                precipitation: precipitation[i],
                precipitation_probability: precipitation_probability[i],
                rain: rain[i],
                showers: showers[i],
                soil_moisture_3_to_9cm: soil_moisture_3_to_9cm[i],
                wind_gusts_10m: wind_gusts_10m[i],
                wind_speed_10m: wind_speed_10m[i],
                wind_direction_10m: wind_direction_10m[i],
                weather_code: weather_code[i],
                surface_pressure: surface_pressure[i],
                cloud_cover: cloud_cover[i],
                units: units
            });
        }


        return NextResponse.json(weatherData);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', status: 500 });
    }
}