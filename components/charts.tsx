"use client";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


// FLOOD CHARTS
// Bar chart for sum precipitation by day   
function SumPrecipitationChart({ time, precipitation, units }: { time: string[], precipitation: number[], units: any }) {
    const data = [];
    for (let i = 2; i < precipitation.length; i++) {
        data.push({
            name: time[24 * i],
            value: precipitation[i]
        })
    }

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 * 1000) / 1000]}
                        tickFormatter={(v) => `${v.toLocaleString()} ${units.precipitation}`}
                    />
                    <Tooltip
                        formatter={(value) => [`${Number(value ?? 0).toLocaleString()} ${units.precipitation}`, "Precipitation"]}
                        cursor={{ fill: "#f3f4f6" }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}


// Bar chart for soil moisture at the start of the day
function SoilMoistureChart({ time, soil_moisture, units }: { time: string[], soil_moisture: number[], units: any }) {
    const data = [];
    for (let i = 2; i < soil_moisture.length; i++) {
        data.push({
            name: time[24 * i],
            value: soil_moisture[i]
        })
    }

    return (
        <div className="w-full h-90">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 * 1000) / 1000]}
                        tickFormatter={(v) => `${v.toLocaleString()} ${units.soilMoisture}`}
                    />
                    <Tooltip
                        formatter={(value) => [`${Number(value ?? 0).toLocaleString()} ${units.soilMoisture}`, "Soil Moisture"]}
                        cursor={{ fill: "#f3f4f6" }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}


export function FloodCharts({ time, precipitation, soil_moisture, units }: { time: string[], precipitation: number[], soil_moisture: number[], units: any }) {
    return (
        <div className="w-full">
            <p className='text-lg font-semibold'>Precipitation</p>
            <div className='mt-5'>
                <SumPrecipitationChart time={time} precipitation={precipitation} units={units} />
            </div>
            <p className='text-lg font-semibold mt-8'>Soil Moisture</p>
            <div className='mt-7'>
                <SoilMoistureChart time={time} soil_moisture={soil_moisture} units={units} />
            </div>
        </div>
    )
}


// FLASH FLOOD CHARTS
function MaxPrecipitationChart({ time, maxPrecipitation, units }: { time: string[], maxPrecipitation: number[], units: any }) {
    const data = [];
    for (let i = 2; i < maxPrecipitation.length; i++) {
        data.push({
            name: time[24 * i],
            value: maxPrecipitation[i]
        })
    }

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 * 1000) / 1000]}
                        tickFormatter={(v) => `${v.toLocaleString()} ${units.precipitation}`}
                    />
                    <Tooltip
                        formatter={(value) => [`${Number(value ?? 0).toLocaleString()} ${units.precipitation}`, "Max Precipitation"]}
                        cursor={{ fill: "#f3f4f6" }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}


export function FlashFloodCharts({ time, maxPrecipitation, soil_moisture, units }: { time: string[], maxPrecipitation: number[], soil_moisture: number[], units: any }) {
    return (
        <div className="w-full">
            <p className='text-lg font-semibold'>Peak Precipitation</p>
            <div className='mt-5'>
                <MaxPrecipitationChart time={time} maxPrecipitation={maxPrecipitation} units={units} />
            </div>
            <p className='text-lg font-semibold mt-8'>Surface Soil Moisture</p>
            <div className='mt-7'>
                <SoilMoistureChart time={time} soil_moisture={soil_moisture} units={units} />
            </div>
        </div>
    )
}



// WIND CHARTS
function MaxWindGustChart({ time, maxWindGust, units }: { time: string[], maxWindGust: number[], units: any }) {
    const data = [];
    for (let i = 2; i < maxWindGust.length; i++) {
        data.push({
            name: time[24 * i],
            value: maxWindGust[i]
        })
    }


    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 * 1000) / 1000]}
                        tickFormatter={(v) => `${v.toLocaleString()} ${units.windGust}`}
                    />
                    <Tooltip
                        formatter={(value) => [`${Number(value ?? 0).toLocaleString()} ${units.windGust}`, "Max Wind Gust"]}
                        cursor={{ fill: "#f3f4f6" }}
                    />
                    <Line dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

}


function MaxWindSpeedChart({ time, maxWindSpeed, units }: { time: string[], maxWindSpeed: number[], units: any }) {
    const data = [];
    for (let i = 2; i < maxWindSpeed.length; i++) {
        data.push({
            name: time[24 * i],
            value: maxWindSpeed[i]
        })
    }


    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 * 1000) / 1000]}
                        tickFormatter={(v) => `${v.toLocaleString()} ${units.windSpeed}`}
                    />
                    <Tooltip
                        formatter={(value) => [`${Number(value ?? 0).toLocaleString()} ${units.windSpeed}`, "Max Wind Speed"]}
                        cursor={{ fill: "#f3f4f6" }}
                    />
                    <Line dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}


export function WindGustCharts({ time, maxWindGust, maxWindSpeed, units }: { time: string[], maxWindGust: number[], maxWindSpeed: number[], units: any }) {
    return (
        <div className="w-full">
            <p className='text-lg font-semibold'>Maximum Wind Gust</p>
            <div className='mt-5'>
                <MaxWindGustChart time={time} maxWindGust={maxWindGust} units={units} />
            </div>
            <p className='text-lg font-semibold mt-8'>Maximum Wind Speed</p>
            <div className='mt-7'>
                <MaxWindSpeedChart time={time} maxWindSpeed={maxWindSpeed} units={units} />
            </div>
        </div>
    )
}

// THUNDERSTORM CHARTS
function MaxCapeChart({ time, maxCape, units }: { time: string[], maxCape: number[], units: any }) {
    const data = [];
    for (let i = 2; i < maxCape.length; i++) {
        data.push({
            name: time[24 * i],
            value: maxCape[i]
        })
    }

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 13, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.1 * 1000) / 1000]}
                        tickFormatter={(v) => `${v.toLocaleString()} ${units.cape}`}
                    />
                    <Tooltip
                        formatter={(value) => [`${Number(value ?? 0).toLocaleString()} ${units.cape}`, "Max CAPE"]}
                        cursor={{ fill: "#f3f4f6" }}
                    />
                    <Line dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function ThunderstormCharts({ time, maxCape, maxWindGust, units }: { time: string[], maxCape: number[], maxWindGust: number[], units: any }) {
    return (
        <div className="w-full">
            <p className='text-lg font-semibold'>Maximum CAPE</p>
            <div className='mt-5'>
                <MaxCapeChart time={time} maxCape={maxCape} units={units} />
            </div>
            <p className='text-lg font-semibold mt-8'>Maximum Wind Gust</p>
            <div className='mt-7'>
                <MaxWindGustChart time={time} maxWindGust={maxWindGust} units={units} />
            </div>
        </div>
    )
}