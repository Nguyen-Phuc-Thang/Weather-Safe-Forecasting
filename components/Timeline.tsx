// components/DayTimeline.tsx
"use client";

import { useState } from "react";

interface DayButtonProps {
    date: Date;
    isSelected: boolean;
    isToday: boolean;
    onClick: () => void;
}

function DayButton({ date, isSelected, isToday, onClick }: DayButtonProps) {
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = date.getDate();

    return (
        <button
            onClick={onClick}
            className={`
        flex flex-col items-center justify-center gap-1 flex-1 py-2.5 px-1
        border rounded-lg transition-colors text-sm
        ${isSelected
                    ? "bg-blue-50 border-blue-400 text-blue-700"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }
      `}
        >
            <span className={`text-xs font-medium ${isSelected ? "text-blue-500" : "text-gray-400"}`}>
                {dayName}
            </span>
            <span className={`text-lg font-medium ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                {dayNum}
            </span>
            {/* today indicator dot */}
            <span className={`w-1.5 h-1.5 rounded-full ${isToday && !isSelected ? "bg-gray-400" :
                isToday && isSelected ? "bg-blue-500" : "bg-transparent"
                }`} />
        </button>
    );
}

interface TimelineProps {
    onDaySelected: (dateIndex: number) => void;
}

export default function Timeline({ onDaySelected }: TimelineProps) {
    const today = new Date();

    // generate 7 days starting 3 days ago
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return d;
    });

    const [selectedIndex, setSelectedIndex] = useState(0); // today

    return (
        <div>
            <div className="flex items-center gap-1">
                {days.map((day, i) => (
                    <DayButton
                        key={i}
                        date={day}
                        isSelected={i === selectedIndex}
                        isToday={day.toDateString() === today.toDateString()}
                        onClick={() => {
                            setSelectedIndex(i);
                            onDaySelected(i);
                        }}
                    />
                ))}
            </div>

            <p className="mt-3 text-sm text-gray-500">
                Selected:{" "}
                <span className="text-gray-800 font-medium">
                    {days[selectedIndex].toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </span>
            </p>
        </div>
    );
}