// Geocoding API
import { NextResponse, NextRequest } from 'next/server';
import FloodLogic from '../../../lib/weather_logic/floodLogic';
import FlashFloodLogic from '../../../lib/weather_logic/flashFloodLogic';
import WindGustLogic from '@/lib/weather_logic/windGustLogic';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const lat = searchParams.get('latitude');
        const lng = searchParams.get('longitude');

        if (!lat || !lng) {
            return NextResponse.json({ error: 'Missing latitude or longitude', status: 400 });
        }

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=soil_moisture_0_to_1cm,soil_moisture_9_to_27cm,precipitation,wind_direction_10m,wind_speed_10m,wind_gusts_10m&past_days=2`);

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
            }).replace(" at ", " ");
        });


        const precipitation: number[] = data.hourly.precipitation;
        const soilMoisture9_to_27cm: number[] = data.hourly.soil_moisture_9_to_27cm;
        const soilMoisture_surface: number[] = data.hourly.soil_moisture_0_to_1cm;
        const windGust: number[] = data.hourly.wind_gusts_10m;
        const windSpeed: number[] = data.hourly.wind_speed_10m;
        const windDirection: number[] = data.hourly.wind_direction_10m;

        const weatherData = {
            time: time,
            flood: FloodLogic(data.hourly.time, precipitation, soilMoisture9_to_27cm, units),
            flashFlood: FlashFloodLogic(data.hourly.time, precipitation, soilMoisture_surface, units),
            wind: WindGustLogic(data.hourly.time, windGust, windSpeed, windDirection, units),
        }

        return NextResponse.json(weatherData);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', status: 500 });
    }
}