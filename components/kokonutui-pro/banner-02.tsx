"use client";

import { cn } from "@/lib/utils";
import { X, ArrowRight } from "lucide-react";
import { useState } from "react";

interface DiscountBannerProps {
    discount: string;
    message: string;
    ctaText?: string;
    ctaLink?: string;
    className?: string;
}

export default function Banner02({
    discount,
    message,
    ctaText = "Shop Now",
    ctaLink = "#",
    className,
}: DiscountBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div
            className={cn(
                "w-full bg-green-600 text-white relative overflow-hidden transition-all duration-300",
                className
            )}
        >
            <div className="mx-auto max-w-7xl relative">
                <div className="flex items-center justify-center py-2 px-4 md:py-3">
                    {/* Main content */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-1 flex-1 text-center">
                        <span className="font-bold tracking-wider uppercase text-xl">
                            {discount || "50% OFF"}
                        </span>
                        <span className="text-sm tracking-wide">
                            {message || "Summer Sale!"}
                        </span>
                        <a
                            href={ctaLink}
                            className="group inline-flex items-center gap-x-1 text-sm font-medium 
                                     hover:underline underline-offset-4 transition-all"
                        >
                            {ctaText}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 
                                 hover:opacity-70 transition-opacity"
                        aria-label="Close banner"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
