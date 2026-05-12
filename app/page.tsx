"use client";

import { useEffect, useMemo, useState } from "react";
import Timeline from "@/components/Timeline";
import { Collapsible } from "@/components/Collapsible";
import { FloodCharts, FlashFloodCharts, WindGustCharts, ThunderstormCharts } from "@/components/charts";
import { floodAdvice, flashFloodAdvice, windGustAdvice, thunderstormAdvice } from "@/lib/weather_logic/advices";
import { useSettings } from "@/context/SettingContext";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country: string;
}

interface ModeButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

function ModeButton({ text, selected, onClick }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 transition-colors ${selected
        ? "bg-blue-50 text-blue-700 border-blue-400"
        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
        }"
        }`}
    >
      {text}
    </button>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [resultShown, setResultShown] = useState(false);
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [weatherData, setWeatherData] = useState<any>({});
  const [dayWeatherData, setDayWeatherData] = useState<any>(null);
  const [modesSelected, setModesSelected] = useState<boolean[]>([true, false, false, false]);

  const { settings, setSettings } = useSettings();

  const showWeatherDataOfDay = (index: number, data: any) => {
    setDayWeatherData({
      flood: {
        riskLevel: data.flood.riskLevel[index],
        riskScore: data.flood.riskScore[index],
        precipitation: data.flood.sumPrecipitationByDay[index + 2],
        soilMoisture: data.flood.soilMoistureStartOfDay[index + 2],
        units: {
          precipitation: data.flood.units.precipitation,
          soilMoisture: data.flood.units.soilMoisture,
        }
      },
      flashFlood: {
        riskLevel: data.flashFlood.riskLevel[index],
        riskScore: data.flashFlood.riskScore[index],
        precipitation: data.flashFlood.maxPrecipitationByDay[index + 2],
        soilMoisture: data.flashFlood.smSurfaceAtPrecipitationPeak[index + 2],
        units: {
          precipitation: data.flashFlood.units.precipitation,
          soilMoisture: data.flashFlood.units.soilMoisture,
        }
      },
      wind: {
        riskLevel: data.wind.riskLevel[index],
        riskWindDirection: data.wind.riskWindDirection[index],
        maxWindGust: data.wind.maxWindGustByDay[index + 2],
        maxWindSpeed: data.wind.maxWindSpeedByDay[index + 2],
        units: {
          windGust: data.wind.units.windGust,
          windSpeed: data.wind.units.windSpeed,
        }
      },
      thunderstorm: {
        riskLevel: data.thunderstorm.riskLevel[index],
        maxCape: data.thunderstorm.maxCapeByDay[index + 2],
        maxWindGust: data.thunderstorm.maxWindGustByDay[index + 2],
        units: {
          cape: data.thunderstorm.units.cape,
          windGust: data.thunderstorm.units.windGust
        }
      }
    });

  }

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}&windSpeedUnit=${settings.windSpeedUnit}&precipitationUnit=${settings.precipitationUnit}`);
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setWeatherData(data);
    showWeatherDataOfDay(0, data);
    setResultShown(true);
  };

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      setSearchResults([]);
      return;
    }

    const fetchResult = async () => {
      const response = await fetch(`/api/geocoding?location=${encodeURIComponent(normalizedQuery)}`);
      if (!response.ok) {
        setSearchResults([]);
        return;
      }

      const data = await response.json();
      if (data.results === undefined || data.results.length === 0) {
        setSearchResults([]);
        return;
      }

      const locations: Location[] = data.results.map((result: any) => ({
        id: result.id,
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country_code: result.country_code,
        country: result.country
      }));

      setSearchResults(locations);
    }

    fetchResult();
  }, [query]);

  return (
    <div className="flex min-h-[calc(100vh-6rem)] w-full items-start justify-start px-6 py-14 sm:px-10">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold uppercase tracking-[0.32em] text-sky-700">
            Weather Safe Forecasting
          </h1>
        </div>

        <div className="w-3/4 mx-auto items-center justify-center">
          <label htmlFor="location-search" className="sr-only">
            Location
          </label>

          <div className="relative">
            <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-3 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.08)] focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
              <input
                id="location-search"
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setResultShown(false);
                }}
                placeholder="Enter a location..."
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                aria-label="Search"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white transition-colors hover:bg-sky-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </button>
            </div>

            {query.trim() && !resultShown ? (
              <div className="absolute left-0 right-0 mt-1 top-full z-10 rounded-2xl -mt-px overflow-hidden border border-slate-200 border-t-0 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">Results</p>
                  <p className="text-xs text-slate-500">Showing {searchResults.length} matches</p>
                </div>

                <div className="max-h-[15rem] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((result: Location, index) => (
                      <button
                        key={result.id}
                        type="button"
                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-sky-50 ${index !== searchResults.length - 1 ? "border-b border-slate-200/80" : ""
                          }`}
                        onClick={() => fetchWeatherData(result.latitude, result.longitude)}
                      >
                        <div className="flex flex-row items-center">
                          <img src={`https://flagsapi.com/${result.country_code}/flat/64.png`} alt={result.name} className="h-10 w-10 object-cover mr-3" />
                          <span className="font-medium text-slate-800">{result.name}</span>
                        </div>
                        <span className="text-xs text-slate-500">Lat: {result.latitude}, Lng: {result.longitude}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-sm text-slate-500">No matching results.</div>
                  )}
                </div>
              </div>
            ) : null}
          </div>



        </div>

        {query.trim() && resultShown ? (
          <div className="mt-8 w-full px-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-end gap-4">
                <h3 className="font-semibold text-4xl">{query}</h3>
                <img src={`https://flagsapi.com/${searchResults?.[0]?.country_code}/flat/64.png`} alt={query} className="h-10 w-10 object-cover" />
              </div>
              <p className='text-sm mt-2 text-slate-400'>Latitude: {searchResults?.[0]?.latitude}, Longitude: {searchResults?.[0]?.longitude}</p>
            </div>

            <div className='mt-6 flex flex-row items-center'>
              <ModeButton text="Flood" selected={modesSelected[0]} onClick={() => setModesSelected([true, false, false, false])} />
              <div className='w-[1px] h-[2rem] bg-slate-300'></div>
              <ModeButton text="Flash Flood" selected={modesSelected[1]} onClick={() => setModesSelected([false, true, false, false])} />
              <div className='w-[1px] h-[2rem] bg-slate-300'></div>
              <ModeButton text="Wind Gust" selected={modesSelected[2]} onClick={() => setModesSelected([false, false, true, false])} />
              <div className='w-[1px] h-[2rem] bg-slate-300'></div>
              <ModeButton text="Thunderstorm" selected={modesSelected[3]} onClick={() => setModesSelected([false, false, false, true])} />
            </div>
            <div className="w-full h-[1px] bg-black"></div>
            <div className='mt-6'>
              <Timeline
                onDaySelected={(dateIndex: number) => {
                  showWeatherDataOfDay(dateIndex, weatherData);
                }}
              />
            </div>

            {modesSelected[0] ? (
              <div>
                <p className='text-lg text-slate-500 mt-6 mb-4'>Flood Risk Level: <span className='text-lg text-slate-700 font-semibold '>{dayWeatherData?.flood.riskLevel}</span></p>
                <div className="mb-4">
                  <Collapsible title="Actionable Advice" defaultOpen={true}
                    children={
                      <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-gray-600">
                        {floodAdvice[dayWeatherData?.flood.riskLevel]?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    }
                  />
                </div>

                <p className='text-lg text-slate-500 mb-2'>Precipitation: {dayWeatherData?.flood.precipitation.toFixed(2)} {dayWeatherData?.flood.units.precipitation}</p>
                <p className='text-lg text-slate-500 mb-2'>Soil Moisture: {dayWeatherData?.flood.soilMoisture.toFixed(2)} {dayWeatherData?.flood.units.soilMoisture}</p>

                <p className='mt-6 text-2xl font-semibold'>Overall Weather Statistics</p>
                <div className='mt-5'>
                  <FloodCharts time={weatherData?.time || []} precipitation={weatherData?.flood.sumPrecipitationByDay || []} soil_moisture={weatherData?.flood.soilMoistureStartOfDay || []} units={weatherData?.flood.units || {}} />
                </div>
              </div>


            ) : null}

            {
              modesSelected[1] ? (
                <div>
                  <p className='text-lg text-slate-500 mt-6 mb-4'>Flash Flood Risk Level: <span className='text-lg text-slate-700 font-semibold '>{dayWeatherData?.flashFlood.riskLevel}</span></p>
                  <div className="mb-4">
                    <Collapsible title="Actionable Advice" defaultOpen={true}
                      children={
                        <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-gray-600">
                          {flashFloodAdvice[dayWeatherData?.flashFlood.riskLevel]?.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      }
                    />
                  </div>

                  <p className='text-lg text-slate-500 mb-2'>Precipitation: {dayWeatherData?.flashFlood.precipitation.toFixed(2)} {dayWeatherData?.flashFlood.units.precipitation}</p>
                  <p className='text-lg text-slate-500 mb-2'>Soil Moisture: {dayWeatherData?.flashFlood.soilMoisture.toFixed(2)} {dayWeatherData?.flashFlood.units.soilMoisture}</p>

                  <p className='mt-6 text-2xl font-semibold'>Overall Weather Statistics</p>
                  <div className='mt-5'>
                    <FlashFloodCharts time={weatherData?.time || []} maxPrecipitation={weatherData?.flashFlood.maxPrecipitationByDay || []} soil_moisture={weatherData?.flashFlood.smSurfaceAtPrecipitationPeak || []} units={weatherData?.flashFlood.units || {}} />
                  </div>
                </div>
              ) : null

            }

            {
              modesSelected[2] ? (
                <div>
                  <p className='text-lg text-slate-500 mt-6 mb-3'>Wind Risk Level: <span className='text-lg text-slate-700 font-semibold '>{dayWeatherData?.wind.riskLevel}</span></p>
                  <p className='text-lg text-slate-500 mb-3'>Wind Direction: {dayWeatherData?.wind.riskWindDirection}</p>
                  <div className="mb-4">
                    <Collapsible title="Actionable Advice" defaultOpen={true}
                      children={
                        <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-gray-600">
                          {windGustAdvice[dayWeatherData?.wind.riskLevel]?.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      }
                    />
                  </div>

                  <p className='text-lg text-slate-500 mb-2'>Max Wind Gust: {dayWeatherData?.wind.maxWindGust.toFixed(2)} {dayWeatherData?.wind.units.windGust}</p>
                  <p className='text-lg text-slate-500 mb-2'>Max Wind Speed: {dayWeatherData?.wind.maxWindSpeed.toFixed(2)} {dayWeatherData?.wind.units.windSpeed}</p>

                  <p className='mt-6 text-2xl font-semibold'>Overall Weather Statistics</p>
                  <div className='mt-5'>
                    <WindGustCharts time={weatherData?.time || []} maxWindGust={weatherData?.wind.maxWindGustByDay || []} maxWindSpeed={weatherData?.wind.maxWindSpeedByDay || []} units={weatherData?.wind.units || {}} />
                  </div>
                </div>
              ) : null

            }

            {modesSelected[3] ? (
              <div>
                <p className='text-lg text-slate-500 mt-6 mb-3'>Thunderstorm Risk Level: <span className='text-lg text-slate-700 font-semibold '>{dayWeatherData?.thunderstorm.riskLevel}</span></p>
                <div className="mb-4">
                  <Collapsible title="Actionable Advice" defaultOpen={true}
                    children={
                      <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-gray-600">
                        {thunderstormAdvice[dayWeatherData?.thunderstorm.riskLevel]?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    }
                  />
                </div>

                <p className='text-lg text-slate-500 mb-2'>Max CAPE: {dayWeatherData?.thunderstorm.maxCape.toFixed(2)} {dayWeatherData?.thunderstorm.units.cape}</p>
                <p className='text-lg text-slate-500 mb-2'>Max Wind Gust: {dayWeatherData?.thunderstorm.maxWindGust.toFixed(2)} {dayWeatherData?.thunderstorm.units.windGust}</p>

                <p className='mt-6 text-2xl font-semibold'>Overall Weather Statistics</p>
                <div className='mt-5'>
                  <ThunderstormCharts time={weatherData?.time || []} maxCape={weatherData?.thunderstorm.maxCapeByDay || []} maxWindGust={weatherData?.thunderstorm.maxWindGustByDay || []} units={weatherData?.thunderstorm.units || {}} />
                </div>
              </div>
            ) : null
            }
          </div>
        ) : null}
      </div>
    </div>
  );
}
