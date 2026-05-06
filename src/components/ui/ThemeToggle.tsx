"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="theme-toggle-single" style={{ width: "40px", height: "40px", borderRadius: "50%" }}></div>;
    }

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <>
            <button
                onClick={toggleTheme}
                className="theme-toggle-single"
                title={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
                aria-label="Basculer le thème"
            >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <style jsx>{`
                .theme-toggle-single {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: var(--radius-full, 50%);
                    border: 1px solid var(--color-border);
                    background: var(--color-bg-secondary);
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .theme-toggle-single:hover {
                    color: var(--color-primary);
                    background: var(--color-bg);
                    border-color: var(--color-primary);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-sm);
                }
            `}</style>
        </>
    );
}
