// components/Collapsible.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="text-sm font-medium text-gray-900">{title}</span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div className="px-4 pb-4 pt-3 border-t border-gray-100 text-sm text-gray-600">
                    {children}
                </div>
            )}
        </div>
    );
}