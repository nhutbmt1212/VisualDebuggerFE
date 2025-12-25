'use client';

import React from 'react';

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Animated grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            {/* Moving diagonal lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                        <path
                            d="M 80 0 L 0 80"
                            stroke="rgba(168, 85, 247, 0.1)"
                            strokeWidth="1"
                            fill="none"
                        />
                    </pattern>

                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.3)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                    </linearGradient>
                </defs>

                {/* Animated diagonal line 1 */}
                <line
                    x1="-100%"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-slide-diagonal-1"
                />

                {/* Animated diagonal line 2 */}
                <line
                    x1="-100%"
                    y1="20%"
                    x2="100%"
                    y2="120%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-slide-diagonal-2"
                />

                {/* Animated diagonal line 3 */}
                <line
                    x1="-100%"
                    y1="40%"
                    x2="100%"
                    y2="140%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-slide-diagonal-3"
                />

                {/* Animated diagonal line 4 */}
                <line
                    x1="-100%"
                    y1="60%"
                    x2="100%"
                    y2="160%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-slide-diagonal-4"
                />

                {/* Animated diagonal line 5 */}
                <line
                    x1="-100%"
                    y1="80%"
                    x2="100%"
                    y2="180%"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-slide-diagonal-5"
                />
            </svg>

            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-float-slower" />
        </div>
    );
}
