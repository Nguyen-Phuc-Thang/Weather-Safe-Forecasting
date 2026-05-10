// Geocoding API
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const location = searchParams.get('location');

        if (!location) {
            return NextResponse.json({ error: 'Missing location', status: 400 });
        }

        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=10&language=en&format=json`);

        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error', status: 500 });
    }
}