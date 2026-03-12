"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FiMoreVertical, FiEdit, FiEye, FiPlusCircle } from "react-icons/fi";

type PatientActionsMenuProps = {
    patientId: string;
};

export default function PatientActionsMenu({ patientId }: PatientActionsMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 6,
                left: rect.right + window.scrollX - 260,
            });
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (triggerRef.current && triggerRef.current.contains(target)) return;
            if (dropdownRef.current && dropdownRef.current.contains(target)) return;
            setIsOpen(false);
        };

        const handleScroll = () => setIsOpen(false);
        const handleResize = () => updatePosition();

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen, updatePosition]);

    const handleToggle = () => {
        if (!isOpen) updatePosition();
        setIsOpen((prev) => !prev);
    };

    const triggerStyle: React.CSSProperties = {
        background: isOpen ? "var(--color-bg-tertiary)" : "transparent",
        border: `1.5px solid ${isOpen ? "var(--color-primary)" : "var(--color-border)"}`,
        color: isOpen ? "var(--color-primary)" : "var(--color-text-secondary)",
        width: 36,
        height: 36,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "1.15rem",
    };

    const dropdownStyle: React.CSSProperties = {
        position: "absolute",
        top: coords.top,
        left: coords.left,
        minWidth: 260,
        padding: "6px",
        borderRadius: 14,
        zIndex: 9999,
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.12)",
        animation: "portalMenuFadeIn 0.18s ease-out",
    };

    const itemBaseStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        color: "var(--color-text)",
        textDecoration: "none",
        borderRadius: 10,
        fontSize: "0.9rem",
        fontWeight: 500,
        transition: "all 0.15s ease",
        whiteSpace: "nowrap",
    };

    const iconStyle: React.CSSProperties = {
        fontSize: "1.1rem",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
    };

    const menuItems = [
        {
            href: `/doctor/patients/${patientId}/edit`,
            icon: <FiEdit style={{ ...iconStyle, color: "var(--color-warning)" }} />,
            label: "Gérer le dossier médical",
        },
        {
            href: `/doctor/patients/${patientId}`,
            icon: <FiEye style={{ ...iconStyle, color: "var(--color-primary)" }} />,
            label: "Voir le dossier médical",
        },
    ];

    return (
        <>
            <button
                ref={triggerRef}
                style={triggerStyle}
                onClick={handleToggle}
                aria-label="Actions"
                onMouseEnter={(e) => {
                    if (!isOpen) {
                        e.currentTarget.style.background = "var(--color-bg-tertiary)";
                        e.currentTarget.style.color = "var(--color-primary)";
                        e.currentTarget.style.borderColor = "var(--color-primary)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isOpen) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--color-text-secondary)";
                        e.currentTarget.style.borderColor = "var(--color-border)";
                    }
                }}
            >
                <FiMoreVertical />
            </button>

            {isOpen &&
                createPortal(
                    <>
                        <div ref={dropdownRef} style={dropdownStyle}>
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    style={itemBaseStyle}
                                    onClick={() => setIsOpen(false)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "var(--color-bg-secondary)";
                                        e.currentTarget.style.color = "var(--color-primary)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "var(--color-text)";
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                        <style>{`
                            @keyframes portalMenuFadeIn {
                                from { opacity: 0; transform: translateY(-8px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                        `}</style>
                    </>,
                    document.body
                )}
        </>
    );
}
