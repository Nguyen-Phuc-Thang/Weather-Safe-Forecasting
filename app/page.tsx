"use client";

import { useEffect, useMemo, useState } from "react";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  country: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [resultShown, setResultShown] = useState(false);
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [weatherData, setWeatherData] = useState<Object[]>([]);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`);
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setWeatherData([data]);
    console.log(data);
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
              <button className='px-4 py-2 hover:border-t-2 hover:border-sky-500 focus:border-t-2 focus:border-sky-500'>Flood</button>
              <div className='w-[1px] h-[2rem] bg-slate-300'></div>
              <button className='px-4 py-2 hover:border-t-2 hover:border-sky-500 focus:border-t-2 focus:border-sky-500'>Flash Flood</button>
              <div className='w-[1px] h-[2rem] bg-slate-300'></div>
              <button className='px-4 py-2 hover:border-t-2 hover:border-sky-500 focus:border-t-2 focus:border-sky-500'>Wind Gust</button>
              <div className='w-[1px] h-[2rem] bg-slate-300'></div>
              <button className='px-4 py-2 hover:border-t-2 hover:border-sky-500 focus:border-t-2 focus:border-sky-500'>Thunderstorm</button>
            </div>
            <div className="w-full h-[1px] bg-black"></div>

          </div>
        ) : null}
      </div>
    </div>
  );
}
