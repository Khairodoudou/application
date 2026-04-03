"use client";

import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return (
        <div className="pagination-container glass animate-fade-in">
            <div className="pagination-info">
                Affichage de <span className="highlight-text">{startIndex + 1} - {endIndex}</span> sur <span className="highlight-text">{totalItems}</span> éléments
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn icon-btn"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    title="Première page"
                >
                    <FiChevronsLeft />
                </button>
                <button
                    className="pagination-btn icon-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    title="Précédent"
                >
                    <FiChevronLeft />
                </button>

                {getPageNumbers()[0] > 1 && (
                    <span className="pagination-ellipsis">...</span>
                )}

                {getPageNumbers().map(page => (
                    <button
                        key={page}
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                    <span className="pagination-ellipsis">...</span>
                )}

                <button
                    className="pagination-btn icon-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    title="Suivant"
                >
                    <FiChevronRight />
                </button>
                <button
                    className="pagination-btn icon-btn"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    title="Dernière page"
                >
                    <FiChevronsRight />
                </button>
            </div>

            <style jsx>{`
                .pagination-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    background: rgba(255, 255, 255, 0.04);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    gap: 1rem;
                    flex-wrap: wrap;
                    margin-top: 2rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
                }

                .pagination-info {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                }

                .highlight-text {
                    color: var(--color-text);
                    font-weight: 700;
                }

                .pagination-controls {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }

                .pagination-ellipsis {
                    color: var(--color-text-secondary);
                    font-weight: bold;
                    padding: 0 4px;
                    letter-spacing: 1px;
                }

                .pagination-btn {
                    min-width: 40px;
                    height: 40px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    background: var(--color-bg);
                    color: var(--color-text);
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .pagination-btn:hover:not(:disabled) {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .pagination-btn.active {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #3b82f6));
                    color: white;
                    border-color: transparent;
                    box-shadow: 0 4px 15px hsla(210, 100%, 56%, 0.4);
                    transform: scale(1.05);
                }

                .pagination-btn:disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                    transform: none;
                }

                .icon-btn {
                    font-size: 1.2rem;
                }

                @media (max-width: 768px) {
                    .pagination-container {
                        flex-direction: column;
                        text-align: center;
                        padding: 1.25rem;
                    }
                    .pagination-controls {
                        justify-content: center;
                        flex-wrap: wrap;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
