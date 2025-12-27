'use client';

import React from 'react';

export const BackgroundPattern: React.FC = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
                backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }}
        />
    );
};
