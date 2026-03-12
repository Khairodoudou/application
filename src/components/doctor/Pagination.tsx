"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, start + maxVisible - 1);

            if (end === totalPages) {
                start = Math.max(1, end - maxVisible + 1);
            }

            for (let i = start; i <= end; i++) pages.push(i);
        }
        return pages;
    };

    return (
        <div className="pagination-container">
            <div className="pagination-info">
                Affichage de <strong>{Math.min(itemsPerPage, totalItems - (currentPage - 1) * itemsPerPage)}</strong> sur <strong>{totalItems}</strong> éléments
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    title="Précédent"
                >
                    <FiChevronLeft />
                </button>

                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    title="Suivant"
                >
                    <FiChevronRight />
                </button>
            </div>

            <style jsx>{`
                .pagination-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    background: rgba(255, 255, 255, 0.02);
                    border-top: 1px solid var(--glass-border);
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .pagination-info {
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                }

                .pagination-info strong {
                    color: var(--color-text);
                }

                .pagination-controls {
                    display: flex;
                    gap: 6px;
                    align-items: center;
                }

                .pagination-btn {
                    min-width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--glass-border);
                    background: var(--color-bg);
                    color: var(--color-text);
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .pagination-btn:hover:not(:disabled) {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                    background: hsla(210, 100%, 56%, 0.05);
                }

                .pagination-btn.active {
                    background: var(--color-primary);
                    color: white;
                    border-color: var(--color-primary);
                    box-shadow: 0 4px 12px hsla(210, 100%, 56%, 0.3);
                }

                .pagination-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                @media (max-width: 640px) {
                    .pagination-container {
                        flex-direction: column;
                        text-align: center;
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
