"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    limit: number
    onLimitChange: (limit: number) => void
    className?: string
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    limit,
    onLimitChange,
    className,
}: PaginationProps) {
    // We still want to handle totalPages logic if needed, but for now we follow the UI request

    return (
        <div className={cn("flex flex-col md:flex-row items-center justify-center gap-6 py-4", className)}>
            <div className="flex items-center gap-4 bg-[#1a1625]/80 backdrop-blur-md border border-slate-800/50 p-2 rounded-2xl shadow-2xl">
                {/* PREV Button */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(currentPage - 1);
                    }}
                    disabled={currentPage <= 1}
                    className="bg-[#241f31] border-slate-800 text-white hover:bg-slate-800 hover:text-white h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Prev</span>
                </Button>

                {/* Page Indicator */}
                <div className="flex items-center gap-3 px-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Page</span>
                    <div className="bg-[#241f31] border border-slate-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                        <span className="text-white font-black text-base">{currentPage}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Of {totalPages}</span>
                </div>

                {/* NEXT Button */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(currentPage + 1);
                    }}
                    disabled={currentPage >= totalPages}
                    className="bg-[#241f31] border-slate-800 text-white hover:bg-slate-800 hover:text-white h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none group"
                >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Items Per Page Selector */}
            <div className="flex items-center gap-3 bg-[#1a1625]/80 backdrop-blur-md border border-slate-800/50 p-2 px-4 rounded-2xl shadow-xl">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Show</span>
                <div className="relative">
                    <input
                        type="number"
                        value={limit}
                        min={1}
                        max={50}
                        onChange={(e) => onLimitChange(parseInt(e.target.value) || 1)}
                        className="bg-[#241f31] border border-slate-700 w-16 h-12 rounded-xl text-center text-white font-black text-sm focus:outline-none focus:border-primary transition-all shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-left">Items / Page</span>
            </div>
        </div>
    )
}
