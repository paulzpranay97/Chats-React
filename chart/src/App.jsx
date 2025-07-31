import { React } from 'react'
import './App.css'
import MainLayout from './Layouts/MainLayout.jsx'

function App() {

  return (
    <>
      <MainLayout />
    </>
  )
}

export default App;



// import React, { useRef, useEffect, useState, useCallback } from 'react';

// // Recharts Imports
// import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

// // D3.js Imports
// import * as d3 from 'd3';





// const GaugeCard = ({ children, value, label, color }) => {
//   const colorClass = {
//     'indigo': 'border-indigo-400',
//     'purple': 'border-purple-400',
//     'pink': 'border-pink-400',
//   }[color] || 'border-gray-300';

//   return (
//     <div className={`flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 ${colorClass}`}>
//       <div className="w-full h-48 flex items-center justify-center">
//         {children}
//       </div>
//       <p className="text-4xl font-bold mt-4 text-gray-800">{value}</p>
//       <p className="text-lg text-gray-600 mt-1">{label}</p>
//     </div>
//   );
// };
// const D3Gauge = ({ value, color }) => {
//   const svgRef = useRef();

//   const drawGauge = useCallback(() => {
//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove();

//     const width = svg.node().clientWidth;
//     const height = svg.node().clientHeight;
//     const radius = Math.min(width, height) / 2 * 0.8;
//     const centerX = width / 2;
//     const centerY = height / 2 + radius * 0.2; 

//     const COLORS = {
//       indigo: '#818CF8',
//       purple: '#A78BFA',
//       pink: '#F472B6',
//     };
//     const gaugeColor = COLORS[color] || '#8884d8';
//     const backgroundColor = '#E5E7EB';

//     const arcBackground = d3.arc()
//       .innerRadius(radius * 0.7)
//       .outerRadius(radius)
//       .startAngle(-Math.PI/2) // 180°
//       .endAngle(Math.PI/2)         // 0°
//       .cornerRadius(5);

//     const arcForeground = d3.arc()
//       .innerRadius(radius * 0.7)
//       .outerRadius(radius)
//       .startAngle(-Math.PI /2 + (value / 100) * Math.PI)
//       .endAngle(-Math.PI /2)
//       .cornerRadius(5);

//     const g = svg.append('g')
//       .attr('transform', `translate(${centerX}, ${centerY})`);

//     // Draw background arc
//     g.append('path')
//       .attr('d', arcBackground())
//       .attr('fill', backgroundColor);

//     // Draw foreground arc
//     g.append('path')
//       .attr('d', arcForeground())
//       .attr('fill', gaugeColor);

//     // Needle
//     const needleLength = radius * 0.6;
//     const needleBaseRadius = radius * 0.07;

//     // Base path pointing up (to top)
//     const needlePathBase = `M ${-needleBaseRadius} 0 L 0 ${-needleLength} L ${needleBaseRadius} 0 Z`;

//     // Rotate from left (180°) to right (0°)
//     const rotationAngleDegrees = -90 + (value / 100) * 180;

//     g.append('path')
//       .attr('d', needlePathBase)
//       .attr('fill', gaugeColor)
//       .attr('transform', `rotate(${rotationAngleDegrees})`);

//     // Center circle
//     g.append('circle')
//       .attr('cx', 0)
//       .attr('cy', 0)
//       .attr('r', radius * 0.12)
//       .attr('fill', gaugeColor)
//       .attr('stroke', 'white')
//       .attr('stroke-width', 2);

//   }, [value, color]);

//   useEffect(() => {
//     drawGauge();
//     const handleResize = () => drawGauge();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [drawGauge]);

//   return <svg ref={svgRef} className="w-full h-full"></svg>;
// };


// // --- Main App Component ---
// function App() {
//   const gaugeData = [
//     { value: 55, label: 'Personal Wellbeing', color: 'indigo' },
//     { value: 59, label: 'Community Wellbeing', color: 'purple' },
//     { value: 73, label: 'Spiritual Wellbeing', color: 'pink' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-8 font-['Inter']">
//       <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Gauge Chart Examples in React</h1>


//       {/* D3.js Section */}
//       <section className="mb-16">
//         <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Using D3.js</h2>
//         <p className="text-center text-gray-600 mb-8">
//           D3.js is a powerful library for manipulating documents based on data. It offers maximum flexibility for custom visualizations but has a steeper learning curve.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {gaugeData.map((data, index) => (
//             <GaugeCard key={`d3-${index}`} value={data.value} label={data.label} color={data.color}>
//               <D3Gauge value={data.value} color={data.color} />
//             </GaugeCard>
//           ))}
//         </div>
//       </section>

    

    

//     </div>
//   );
// }

// export default App;
