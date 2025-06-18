// src/components/results/SkeletonCard.jsx
import React from 'react';

const SkeletonCard = () => (
    <>
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="shimmer absolute inset-0"></div>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-md"></div>
                <div className="w-3/4 h-6 bg-white/10 rounded-md"></div>
            </div>
            <div className="w-1/3 h-4 bg-white/10 rounded-md mb-6"></div>
            <div className="space-y-3">
                <div className="flex justify-between items-center"><div className="w-2/3 h-5 bg-white/10 rounded-md"></div><div className="w-1/5 h-7 bg-white/10 rounded-md"></div></div>
                <div className="flex justify-between items-center"><div className="w-1/2 h-5 bg-white/10 rounded-md"></div><div className="w-1/5 h-7 bg-white/10 rounded-md"></div></div>
            </div>
            <div className="w-full h-10 mt-8 bg-white/10 rounded-lg"></div>
        </div>
        <style jsx>{`
            .shimmer {
                background-image: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%);
                background-size: 200% 100%;
                animation: shimmer-animation 1.5s infinite linear;
            }
            @keyframes shimmer-animation {
                from { background-position: 200% 0; }
                to { background-position: -200% 0; }
            }
        `}</style>
    </>
);

export default SkeletonCard;