"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="theme-toggle-wrapper" style={{ minHeight: "42px", minWidth: "220px" }}></div>;
    }

    return (
        <div className="theme-toggle-wrapper">
            <button
                onClick={() => setTheme("light")}
                className={`theme-btn ${theme === "light" ? "active" : ""}`}
                title="Mode Clair"
            >
                <FiSun />
                <span>Clair</span>
            </button>
            <button
                onClick={() => setTheme("dark")}
                className={`theme-btn ${theme === "dark" ? "active" : ""}`}
                title="Mode Sombre"
            >
                <FiMoon />
                <span>Sombre</span>
            </button>
            <button
                onClick={() => setTheme("system")}
                className={`theme-btn ${theme === "system" ? "active" : ""}`}
                title="Système"
            >
                <FiMonitor />
                <span>Système</span>
            </button>

            <style jsx>{`
                .theme-toggle-wrapper {
                    display: flex;
                    gap: 8px;
                    background: var(--color-bg-secondary);
                    padding: 4px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--color-border);
                    width: fit-content;
                }

                .theme-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    border-radius: var(--radius-md);
                    border: none;
                    background: transparent;
                    color: var(--color-text-secondary);
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .theme-btn:hover {
                    color: var(--color-text);
                    background: hsla(0, 0%, 50%, 0.1);
                }

                .theme-btn.active {
                    background: var(--color-bg);
                    color: var(--color-primary);
                    box-shadow: var(--shadow-sm);
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
}
