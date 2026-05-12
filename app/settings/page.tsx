"use client";
import { useSettings } from "@/context/SettingContext";

export default function SettingsPage() {
    const { settings, setSettings } = useSettings();

    const updateWindSpeedUnit = (unit: "kmh" | "ms" | "mph" | "kn") => {
        setSettings((prev) => ({
            ...prev,
            windSpeedUnit: unit,
        }));
    };

    const updatePrecipitationUnit = (unit: "mm" | "inch") => {
        setSettings((prev) => ({
            ...prev,
            precipitationUnit: unit,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-semibold uppercase tracking-[0.32em] text-sky-700">
                Settings
            </h1>
            <div className='mt-10 flex flex-col items-center'>
                <h3 className='text-lg font-bold'>Wind Speed Unit</h3>
                <div className='flex flex-row gap-6 mt-7'>
                    <button
                        className={`w-[100px] flex flex-col items-center justify-center gap-1 flex-1 py-2.5 px-1 border rounded-lg transition-colors text-sm 
                        ${settings.windSpeedUnit === "kmh"
                                ? "bg-blue-50 border-blue-400 text-blue-700"
                                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                        onClick={() => updateWindSpeedUnit("kmh")}
                    >
                        <span className={`text-md font-medium ${settings.windSpeedUnit === "kmh" ? "text-blue-500" : "text-gray-400"}`}>
                            km/h
                        </span>
                    </button>
                    <button className={`w-[100px] flex flex-col items-center justify-center gap-1 flex-1 py-2.5 px-1 border rounded-lg transition-colors text-sm
                        ${settings.windSpeedUnit === "ms"
                            ? "bg-blue-50 border-blue-400 text-blue-700"
                            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                        onClick={() => updateWindSpeedUnit("ms")}
                    >
                        <span className={`text-md font-medium ${settings.windSpeedUnit === "ms" ? "text-blue-500" : "text-gray-400"}`}>
                            m/s
                        </span>
                    </button>

                    <button className={`w-[100px] flex flex-col items-center justify-center gap-1 flex-1 py-2.5 px-1 border rounded-lg transition-colors text-sm
                        ${settings.windSpeedUnit === "mph"
                            ? "bg-blue-50 border-blue-400 text-blue-700"
                            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                        onClick={() => updateWindSpeedUnit("mph")}
                    >
                        <span className={`text-md font-medium ${settings.windSpeedUnit === "mph" ? "text-blue-500" : "text-gray-400"}`}>
                            mph
                        </span>
                    </button>

                    <button className={`w-[100px] flex flex-col items-center justify-center gap-1 flex-1 py-2.5 px-1 border rounded-lg transition-colors text-sm
                        ${settings.windSpeedUnit === "kn"
                            ? "bg-blue-50 border-blue-400 text-blue-700"
                            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                        onClick={() => updateWindSpeedUnit("kn")}
                    >
                        <span className={`text-md font-medium ${settings.windSpeedUnit === "kn" ? "text-blue-500" : "text-gray-400"}`}>
                            Knots
                        </span>
                    </button>
                </div>
            </div>

            <div className='mt-10 flex flex-col items-center'>
                <h3 className='text-lg font-bold'>Precipitation Unit</h3>
                <div className='flex flex-row gap-6 mt-7'>
                    <button
                        className={`w-[100px] flex flex-col items-center justify-center gap-1 flex-1 py-2.5 px-1 border rounded-lg transition-colors text-sm 
                        ${settings.precipitationUnit === "mm"
                                ? "bg-blue-50 border-blue-400 text-blue-700"
                                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                        onClick={() => updatePrecipitationUnit("mm")}
                    >
                        <span className={`text-md font-medium ${settings.precipitationUnit === "mm" ? "text-blue-500" : "text-gray-400"}`}>
                            mm
                        </span>
                    </button>
                    <button className={`w-[100px] flex flex-col items-center justify-center gap-1 flex-1 py-2.5 px-1 border rounded-lg transition-colors text-sm
                        ${settings.precipitationUnit === "inch"
                            ? "bg-blue-50 border-blue-400 text-blue-700"
                            : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                        onClick={() => updatePrecipitationUnit("inch")}
                    >
                        <span className={`text-md font-medium ${settings.precipitationUnit === "inch" ? "text-blue-500" : "text-gray-400"}`}>
                            inch
                        </span>
                    </button>
                </div>
            </div>
        </div >
    );
}