import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

export const AnalyticsChart = ({ title = "Trends", dataMap, color = "#10B981" }) => {
    const [period, setPeriod] = useState('Last 7 Days');
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const periods = Object.keys(dataMap);
    const currentData = dataMap[period];

    // Chart Dimensions
    const height = 250;
    const width = 600; // viewBox width
    const padding = 40;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;

    const values = currentData.map(d => d.value);
    const maxValue = Math.max(...values, 1);
    const minValue = Math.min(...values);

    // Coordinate conversion
    const getX = (index) => padding + (index / (currentData.length - 1)) * chartWidth;
    const getY = (value) => height - padding - ((value / maxValue) * chartHeight);

    // Generate Path (Basic Line)
    const points = currentData.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');

    // Generate Smooth Path (Catmull-Rom or Cubic Bezier wrapper)
    // Simple smoothing strategy: Control points
    const getSmoothPath = () => {
        if (currentData.length < 2) return "";

        let d = `M ${getX(0)} ${getY(currentData[0].value)}`;

        for (let i = 0; i < currentData.length - 1; i++) {
            const x0 = getX(i);
            const y0 = getY(currentData[i].value);
            const x1 = getX(i + 1);
            const y1 = getY(currentData[i + 1].value);

            // Control points for smooth curve
            const cp1x = x0 + (x1 - x0) * 0.5;
            const cp1y = y0;
            const cp2x = x1 - (x1 - x0) * 0.5;
            const cp2y = y1;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
        }
        return d;
    };

    const pathD = getSmoothPath();
    const fillPathD = `${pathD} L ${getX(currentData.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`;

    return (
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-200">{title}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {period} Performance
                    </p>
                </div>

                <div className="relative group">
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
                        {period} <ChevronDown className="w-4 h-4" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-40 bg-slate-900 border border-white/10 rounded-lg shadow-xl overflow-hidden hidden group-hover:block z-20">
                        {periods.map(p => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${period === p ? 'text-primary' : 'text-slate-400'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative w-full aspect-[2/1] select-none">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
                        const y = height - padding - (tick * chartHeight);
                        return (
                            <g key={tick}>
                                <line
                                    x1={padding}
                                    y1={y}
                                    x2={width - padding}
                                    y2={y}
                                    stroke="white"
                                    strokeOpacity="0.05"
                                    strokeDasharray="4 4"
                                />
                                <text x={padding - 10} y={y + 4} textAnchor="end" className="fill-slate-500 text-[10px] font-mono">
                                    {Math.round(tick * maxValue)}
                                </text>
                            </g>
                        );
                    })}

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={color} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <path d={fillPathD} fill="url(#chartGradient)" />

                    {/* Stroke Line */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="drop-shadow-lg"
                    />

                    {/* Points & Tooltip Triggers */}
                    {currentData.map((d, i) => (
                        <g
                            key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="cursor-pointer"
                        >
                            <circle
                                cx={getX(i)}
                                cy={getY(d.value)}
                                r="4"
                                fill={color}
                                stroke="#0f172a"
                                strokeWidth="2"
                                className="transition-all duration-300 hover:r-6"
                            />
                            {/* X Axis Labels */}
                            <text
                                x={getX(i)}
                                y={height - 15}
                                textAnchor="middle"
                                className="fill-slate-500 text-[10px] uppercase font-bold tracking-wider"
                            >
                                {d.label}
                            </text>

                            {/* Vertical Hover Line */}
                            {hoveredIndex === i && (
                                <line
                                    x1={getX(i)}
                                    y1={padding}
                                    x2={getX(i)}
                                    y2={height - padding}
                                    stroke={color}
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                    className="opacity-50"
                                />
                            )}
                        </g>
                    ))}
                </svg>

                {/* Floating Tooltip */}
                {hoveredIndex !== null && (
                    <div
                        className="absolute bg-white text-slate-900 px-4 py-2 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 z-30"
                        style={{
                            left: `${(getX(hoveredIndex) / width) * 100}%`,
                            top: `${(getY(currentData[hoveredIndex].value) / height) * 100}%`
                        }}
                    >
                        <div className="text-xs font-bold text-slate-500 mb-1">{currentData[hoveredIndex].label}</div>
                        <div className="font-bold text-lg whitespace-nowrap" style={{ color: color }}>
                            {currentData[hoveredIndex].value.toLocaleString()} Users
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
