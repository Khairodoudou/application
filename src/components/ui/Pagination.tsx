"use client";

import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    itemName?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    itemName = "éléments"
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const startIndex = (currentPage - 1) * itemsPerPage;

    return (
        <div className="pagination-bar">
            <div className="pagination-info">
                Affichage de <span>{startIndex + 1}</span> à <span>{Math.min(startIndex + itemsPerPage, totalItems)}</span> sur <span>{totalItems}</span> {itemName}
            </div>
            <div className="pagination-controls">
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    ← Précédent
                </button>

                <div className="pagination-pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={`page-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    Suivant →
                </button>
            </div>

            <style jsx>{`
                .pagination-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--spacing-lg) var(--spacing-xl);
                    background: hsla(220, 15%, 94%, 0.3);
                    border-top: 1px solid var(--color-border-light);
                    gap: var(--spacing-lg);
                }

                .pagination-info {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-secondary);
                }

                .pagination-info span {
                    font-weight: 700;
                    color: var(--color-text);
                }

                .pagination-controls {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .pagination-pages {
                    display: flex;
                    gap: 6px;
                }

                .pagination-btn {
                    padding: 8px 16px;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    background: var(--color-bg);
                    color: var(--color-text);
                    font-size: var(--font-size-sm);
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .pagination-btn:hover:not(:disabled) {
                    background: var(--color-bg-secondary);
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-sm);
                }

                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .page-number {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-md);
                    border: 1px solid transparent;
                    background: transparent;
                    color: var(--color-text-secondary);
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .page-number:hover {
                    background: var(--color-bg-secondary);
                    color: var(--color-text);
                }

                .page-number.active {
                    background: var(--color-primary);
                    color: white;
                    box-shadow: 0 4px 12px hsla(210, 100%, 56%, 0.3);
                }

                @media (max-width: 640px) {
                    .pagination-bar {
                        flex-direction: column;
                        align-items: stretch;
                        text-align: center;
                    }
                    .pagination-controls {
                        justify-content: center;
                        flex-wrap: wrap;
                    }
                }
            `}</style>
        </div>
    );
}
