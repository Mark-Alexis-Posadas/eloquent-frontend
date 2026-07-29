import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <span className="text-sm text-gray-400 font-mono">
        Page <span className="text-razer-green font-bold">{currentPage}</span>{" "}
        of <span className="text-white font-bold">{lastPage}</span>
      </span>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-1.5 text-xs font-mono font-bold rounded border border-razer-border bg-razer-card text-white hover:border-razer-green hover:text-razer-green hover:shadow-razer-glow disabled:opacity-40 disabled:hover:border-razer-border disabled:hover:shadow-none transition-all"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> PREV
        </button>

        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded border transition-all ${
              page === currentPage
                ? "bg-razer-green text-black border-razer-green shadow-razer-glow font-extrabold"
                : "bg-razer-card border-razer-border text-white hover:border-razer-green hover:text-razer-green"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="flex items-center px-3 py-1.5 text-xs font-mono font-bold rounded border border-razer-border bg-razer-card text-white hover:border-razer-green hover:text-razer-green hover:shadow-razer-glow disabled:opacity-40 disabled:hover:border-razer-border disabled:hover:shadow-none transition-all"
        >
          NEXT <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
