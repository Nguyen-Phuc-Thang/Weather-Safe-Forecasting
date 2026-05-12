"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type Settings = {
    windSpeedUnit: "kmh" | "ms" | "mph" | "kn";
    precipitationUnit: "mm" | "inch";

};

type SettingsContextType = {
    settings: Settings;
    setSettings: React.Dispatch<
        React.SetStateAction<Settings>
    >;
};

const SettingsContext =
    createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode; }) {
    const [settings, setSettings] = useState<Settings>({
        windSpeedUnit: "kmh",
        precipitationUnit: "mm",
    });

    useEffect(() => {
        const saved =
            localStorage.getItem("settings");

        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    // save localStorage
    useEffect(() => {
        localStorage.setItem(
            "settings",
            JSON.stringify(settings)
        );
    }, [settings]);

    return (
        <SettingsContext.Provider
            value={{ settings, setSettings }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error(
            "useSettings must be used inside provider"
        );
    }

    return context;
}