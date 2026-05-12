// Geocoding API
import { NextResponse, NextRequest } from 'next/server';
import FloodLogic from '../../../lib/weather_logic/floodLogic';
import FlashFloodLogic from '../../../lib/weather_logic/flashFloodLogic';
import WindGustLogic from '@/lib/weather_logic/windGustLogic';
import ThunderstormLogic from '@/lib/weather_logic/thunderstormLogic';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const lat = searchParams.get('latitude');
        const lng = searchParams.get('longitude');
        const windSpeedUnit = searchParams.get('windSpeedUnit') || 'kmh';
        const precipitationUnit = searchParams.get('precipitationUnit') || 'mm';

        if (!lat || !lng) {
            return NextResponse.json({ error: 'Missing latitude or longitude', status: 400 });
        }

        const windSpeedUnitParam = windSpeedUnit === 'kmh' ? '' : `&wind_speed_unit=${windSpeedUnit}`;
        const precipitationUnitParam = precipitationUnit === 'mm' ? '' : `&precipitation_unit=${precipitationUnit}`;

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=soil_moisture_0_to_1cm,soil_moisture_9_to_27cm,precipitation,wind_direction_10m,wind_speed_10m,wind_gusts_10m,cape,weather_code&past_days=2${windSpeedUnitParam}${precipitationUnitParam}`);

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
        const cape: number[] = data.hourly.cape;
        const weatherCode: number[] = data.hourly.weather_code;

        const weatherData = {
            time: time,
            flood: FloodLogic(data.hourly.time, precipitation, soilMoisture9_to_27cm, units),
            flashFlood: FlashFloodLogic(data.hourly.time, precipitation, soilMoisture_surface, units),
            wind: WindGustLogic(data.hourly.time, windGust, windSpeed, windDirection, units),
            thunderstorm: ThunderstormLogic(data.hourly.time, windGust, cape, weatherCode, units),
        }

        return NextResponse.json(weatherData);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', status: 500 });
    }
}