"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    FiGrid,
    FiSearch,
    FiAlertTriangle,
    FiSettings,
    FiLogOut,
    FiUsers,
    FiCalendar,
    FiFileText
} from "react-icons/fi";

type PatientSidebarProps = {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isOpen: boolean) => void;
};

export function PatientSidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: PatientSidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { label: "Dashboard", icon: <FiGrid />, href: "/patient/dashboard" },
        { label: "Dossier Médical", icon: <FiFileText />, href: "/patient/medical-record" },
        { label: "Médecins", icon: <FiUsers />, href: "/patient/doctors" },
        { label: "Analyse Santé Intelligente", icon: <FiSearch />, href: "/patient/scan" },
        { label: "Mes Rendez-vous", icon: <FiCalendar />, href: "/patient/appointments" },
        { label: "Paramètres", icon: <FiSettings />, href: "/patient/settings" },
    ];

    return (
        <>
            {/* Global/Mobile Header - Minimal version with only menu toggle */}
            <header className="mobile-header glass">
                <button
                    className="menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? "✕" : "☰"}
                </button>
            </header>

            {/* Sidebar Component */}
            <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* Branding - Centralized here at the top of everything */}
                <div className="sidebar-brand">
                    <Link href="/patient/dashboard" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image src="/logo.png" alt="HealthAegis" width={140} height={40} className="logo-img" priority />
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <Link href="/login" className="nav-logout">
                        <span className="nav-icon"><FiLogOut /></span>
                        <span>Déconnexion</span>
                    </Link>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <style jsx>{`
                /* Container & Sidebar Structure */
                .sidebar {
                    width: 280px;
                    background: var(--color-bg);
                    border-right: 1px solid var(--color-border);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    z-index: 2000;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 10px 0 30px rgba(0,0,0,0.05);
                }

                .sidebar-brand {
                    padding: 2.5rem 1.5rem;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid var(--color-border-light);
                    margin-bottom: 1rem;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                    text-decoration: none;
                    transition: transform 0.2s;
                }
                
                .logo:hover { transform: scale(1.02); }

                .logo-icon {
                    font-size: var(--font-size-2xl);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .logo-text {
                    font-family: var(--font-display);
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--color-text);
                    line-height: 1.1;
                }

                /* Navigation Links */
                .sidebar-nav {
                    flex: 1;
                    padding: 0 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.85rem 1rem;
                    border-radius: 12px;
                    color: var(--color-text-secondary);
                    font-weight: 600;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    white-space: nowrap;
                }

                .nav-item:hover {
                    background: var(--color-bg-secondary);
                    color: var(--color-primary);
                    padding-left: 1.15rem;
                }

                .nav-item.active {
                    background: var(--color-primary);
                    color: white;
                    box-shadow: 0 8px 20px hsla(210, 100%, 56%, 0.25);
                }

                .nav-icon {
                    width: 24px;
                    font-size: 1.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .nav-label {
                    font-size: 1rem;
                    line-height: 1;
                }

                /* Footer & Logout */
                .sidebar-footer {
                    padding: 1.5rem;
                    border-top: 1px solid var(--color-border-light);
                }

                .nav-logout {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.85rem 1rem;
                    color: var(--color-danger);
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s;
                    border-radius: 12px;
                    white-space: nowrap;
                }

                .nav-logout:hover {
                    background: hsla(0, 84%, 60%, 0.1);
                    transform: translateX(5px);
                }

                /* Mobile Toggle Overlay */
                .sidebar-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.4);
                    backdrop-filter: blur(8px);
                    z-index: 1050;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

                /* Mobile Header Styles */
                .mobile-header {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 70px;
                    z-index: 1000;
                    padding: 0 1.5rem;
                    align-items: center;
                    justify-content: flex-end; /* Toggle on the right on mobile */
                }

                .menu-toggle {
                    background: var(--color-bg);
                    border: 1px solid var(--color-border);
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.4rem;
                    cursor: pointer;
                    color: var(--color-text);
                    transition: all 0.2s;
                    box-shadow: var(--shadow-sm);
                }

                .menu-toggle:hover { background: var(--color-bg-secondary); }

                /* Desktop/Mobile Breakpoints */
                @media (max-width: 1024px) {
                    .mobile-header { display: flex; }
                    .sidebar {
                        transform: translateX(-100%);
                        z-index: 2000;
                    }
                    .sidebar.open {
                        transform: translateX(0);
                    }
                }

                @media (min-width: 1025px) {
                    .sidebar {
                        transform: translateX(0);
                    }
                    .mobile-header {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}
