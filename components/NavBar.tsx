"use client";

import Link from "next/link";

export default function NavBar() {
    return (
        <nav
            aria-label="Primary"
            className="fixed top-0 left-0 right-0 z-50 w-full bg-white/10 px-6 py-4 backdrop-blur-xl backdrop-saturate-150 border-b border-white/15"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <button
                            type="button"
                            className="rounded-xl bg-white/10 px-4 py-2 text-lg font-medium text-slate-900 transition duration-200 ease-out hover:-translate-y-0.5 hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 ml-6"
                        >
                            Forecast
                        </button>
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label="Settings"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-slate-900 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/35 hover:text-gray-100 hover:shadow-[0_12px_30px_rgba(15,23,42,0.16)] hover:rotate-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.05a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.05a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06A2 2 0 1 1 7.03 4.23l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.05a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.64.07 1.2.47 1.46 1.05h.09a2 2 0 1 1 0 4h-.09c-.26.58-.82.98-1.46 1.05Z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}