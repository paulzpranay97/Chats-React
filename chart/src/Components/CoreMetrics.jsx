import React, { useRef, useEffect, useState , useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut,Bar } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 

// D3.js Imports
import * as d3 from 'd3';

// MUI Imports
import { Box, Paper, Typography, Grid, LinearProgress } from '@mui/material';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);



const renderPatientAgeChart = (count15_24, count25_34, count35_44, count45_54, count55Plus, maxCountAgeGroup) => {

  
    const data = {
    labels: ['15-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        label: 'Participant Ages',
        data: [count15_24, count25_34, count35_44, count45_54, count55Plus],
        backgroundColor: '#FF67BB',
        borderColor: '#FF67BB',
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide since there’s only one dataset
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        max: maxCountAgeGroup, // set max based on data
        ticks: {
          display: true,
        },
        grid: {
          display: true,
        },
      },
      y: {
        stacked: false,
        ticks: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , boxSizing: 'border-box', width: '100%'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , width: '100%'}}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }} textAlign={{ xs: 'left', md: 'left' }}>Participant Ages</Typography>

        {/* Chart Container */}
        <Box sx={{ height: 300, width:"100%"}}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};




const renderPatientChart = (thisMonthCount, lastMonthCount, avgMonthCount,maxCount) => {

  
    const data = {
    labels: ['This Month', 'Last Month', 'Avg'],
    datasets: [
      {
        label: 'Participants',
        data: [thisMonthCount, lastMonthCount, avgMonthCount],
        backgroundColor: '#FF67BB',
        borderColor: '#FF67BB',
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide since there’s only one dataset
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        max: maxCount, // set max based on data
        ticks: {
          display: true,
        },
        grid: {
          display: true,
        },
      },
      y: {
        stacked: false,
        ticks: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , boxSizing: 'border-box', width: '100%'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , width: '100%'}}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }} textAlign={{ xs: 'left', md: 'left' }}>Participants</Typography>

        {/* Chart Container */}
        <Box sx={{ height: 200, width: '100%'}}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};




const renderTheCheckInScore = (checkInScore) => {
  const score = checkInScore; // The score value
  const maxScore = 100; // The maximum score

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box  sx={{ width: "100%",  height: 'auto'}}>
        {/* Title */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          The Check-In Score
        </Typography>

        {/* Score */}
        <Typography variant="h3" component="p" sx={{ fontSize: '2.3rem' , fontWeight: 'bold'}} mt={2}>
          {score}/{maxScore}
        </Typography>

        {/* Subtitle */}
        <Typography variant="body2" component="p" mt={2}>
          Last 6 Month
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ width: '100%', borderRadius: '9999px', overflow: 'hidden' }} mt={2} >
          <LinearProgress
            variant="determinate"
            value={score}
            sx={{
              height: 10,
              borderRadius: '9999px',
              backgroundColor: '#E0E7FF', // Light blue background for the progress bar
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#3B82F6', // Darker blue for the filled part
                borderRadius: '9999px',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const renderProfileChart = (genderM, genderF, childrenYes, childrenNo, dependantsYes, dependantsNo, marriedYes, marriedNo) => {

    // Data for the chart, structured to match the screenshot
  const mf_data = {
    labels: [ 'Male/Female'], // Labels for the y-axis (reversed for display order)
    datasets: [
      {
        label: 'Male', // Label for the first segment (e.g., 'Yes' for Family, 'Male' for Male/Female)
        data: [genderM], // Values for Male/Female (light blue segment)
        backgroundColor: '#98E4E9', // Light blue color
        borderColor: '#98E4E9',
        borderWidth: 1,
        barPercentage: 0.8, // Adjust bar thickness
        categoryPercentage: 0.8, // Adjust bar thickness
      },
      {
        label: 'Female', // Label for the second segment (e.g., 'No' for Family, 'Female' for Male/Female)
        data: [genderF], // Values for Male/Female (dark blue segment)
        backgroundColor: '#1A4D8C', // Dark blue color
        borderColor: '#1A4D8C',
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  // Options for the chart to match the screenshot's appearance
  const mf_options = {
    indexAxis: 'y', // Make the bars horizontal
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container
    plugins: {
      legend: {
        display: false, // Show legend for 'Yes' and 'No'
        position: 'top', // Position legend at the top
        align: 'end', // Align legend items to the end (right)
        labels: {
          usePointStyle: true, // Use a small circle for legend items
          boxWidth: 10, // Adjust the size of the legend color box
          padding: 10,
          font: {
            size: 14, 
            family: 'Inter, sans-serif', 
          },
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x + '%'; // Append '%' to tooltip value
            }
            return label;
          }
        }
      },
      title: {
        display: false, // Hide the main chart title as it's part of the static text
      },
    },
    scales: {
      x: {
        stacked: true, 
        max: 100, 
        grid: {
          display: false, 
        },
        ticks: {
          display: true, 
          callback: function(value) {
            return value + '%'; 
          },
          font: {
            size: 9,
            family: 'Inter, sans-serif',
          },
        },
       
        title: {
          display: false,
        },
      },
      y: {
        stacked: true, // Stack the bars horizontally
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          display: false, // Show y-axis labels (Dependents, Children, etc.)
          font: {
            size: 9,
            family: 'Inter, sans-serif',
          },
          color: '#333', // Color for y-axis labels
        },
        // Remove the default label for the y-axis
        title: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };
  // Data for the chart, structured to match the screenshot
  const data = {
    labels: [ 'Married',  'Children','Dependents'], // Labels for the y-axis (reversed for display order)
    datasets: [
      {
        label: 'Yes', // Label for the first segment (e.g., 'Yes' for Family, 'Male' for Male/Female)
        data: [marriedYes, childrenYes, dependantsYes], // Values for Dependents, Children, Married, Male (light blue segment)
        backgroundColor: '#98E4E9', // Light blue color
        borderColor: '#98E4E9',
        borderWidth: 1,
        barPercentage: 0.8, // Adjust bar thickness
        categoryPercentage: 0.8, // Adjust bar thickness
      },
      {
        label: 'No', // Label for the second segment (e.g., 'No' for Family, 'Female' for Male/Female)
        data: [marriedNo, childrenNo, dependantsNo], // Values for Dependents, Children, Married, Female (dark blue segment)
        backgroundColor: '#1A4D8C', // Dark blue color
        borderColor: '#1A4D8C',
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    ],
  };

  // Options for the chart to match the screenshot's appearance
  const options = {
    indexAxis: 'y', // Make the bars horizontal
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container
    plugins: {
      legend: {
        display: true, // Show legend for 'Yes' and 'No'
        position: 'top', // Position legend at the top
        align: 'end', // Align legend items to the end (right)
        labels: {
          usePointStyle: true, // Use a small circle for legend items
          boxWidth: 10, // Adjust the size of the legend color box
          padding: 10,
          font: {
            size: 14, 
            family: 'Inter, sans-serif', 
          },
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x + '%'; // Append '%' to tooltip value
            }
            return label;
          }
        }
      },
      title: {
        display: false, // Hide the main chart title as it's part of the static text
      },
    },
    scales: {
      x: {
        stacked: true, 
        max: 100, 
        grid: {
          display: false, 
        },
        ticks: {
          display: true, 
          callback: function(value) {
            return value + '%'; 
          },
          font: {
            size: 9,
            family: 'Inter, sans-serif',
          },
        },
       
        title: {
          display: false,
        },
      },
      y: {
        stacked: true, // Stack the bars horizontally
        grid: {
          display: false, // Hide y-axis grid lines
        },
        ticks: {
          display: true, // Show y-axis labels (Dependents, Children, etc.)
          font: {
            size: 9,
            family: 'Inter, sans-serif',
          },
          color: '#333', // Color for y-axis labels
        },
        // Remove the default label for the y-axis
        title: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , boxSizing: 'border-box', width: '100%'}}>
      <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' , boxSizing: 'border-box', width: '100%'}} >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }} textAlign={{ xs: 'left', md: 'left' }}>Profiles</Typography>

        {/* Legend for Male/Female */}
        <Box display="flex" alignItems="center" gap={1} >
          <i class="ri-user-fill"></i>
          <Typography variant="h6" component="span" sx={{ fontSize: '1rem', fontWeight: 600, color: '#4B5563' }}>Male/Female</Typography>
        </Box>

        {/* Chart Container */}
        <Box sx={{ height: 100, width: '100%' }}>
          <Bar  data={mf_data} options={mf_options} />
        </Box>

        {/* Legend for Family */}
        <Box display="flex" alignItems="center"  gap={1} mb={1} mt={3}>
          <i class="ri-user-fill"></i>
          <Typography variant="h6" component="span" sx={{ fontSize: '1rem', fontWeight: 600, color: '#4B5563' }}>Family</Typography>
        </Box>

        {/* Chart Container */}
        <Box sx={{ height: 300,width: '100%'}}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

const layerSegmentChart = (layerSingle, layerDeeper, layerRepeat, layerOther) => {
  const data = {
    labels: ['Deeper', 'Repeat', 'Single', 'Other'],
    datasets: [
      {
        data: [layerDeeper, layerRepeat, layerSingle, layerOther],
        backgroundColor: ['#C7D2FE', '#E9D5FF', '#FBCFE8', '#F0ABFC'],
        borderWidth: 0,
        cutout: '65%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.formattedValue}%`,
        },
      },
    },
  };

  const legendItems = [
    { color: '#C7D2FE', label: 'Active in the Deeper Programs' },
    { color: '#E9D5FF', label: 'Repeat participant' },
    { color: '#FBCFE8', label: 'First Response' },
    { color: '#F0ABFC', label: 'Other' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection:{ xs: 'column', md: 'row', lg: 'column' }, alignItems: 'left' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }} textAlign={{ xs: 'left', md: 'center', lg: 'left' }}> 
        Layer Segments
      </Typography>

      <Box sx={{ width: { xs: '100%', md: '50%', lg: '100%' },  display: 'flex', justifyContent: 'center',alignItems: 'center', height: 220 }}>
        <Doughnut data={data} options={options} />
      </Box>

      <Box sx={{ mt: 5, width:{ xs: '100%', md: '50%', lg: '100%' } }}>
        {legendItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
              padding: '5px 0px',

              borderBottom: '1px solid #5454543d',
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                borderRadius: '4px',
               
              }}
            />
            <Typography variant="body2" >{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};


const D3Gauge = ({ value, color, bgcolor }) => {
  const svgRef = useRef();

  const drawGauge = useCallback(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;
    const radius = Math.min(width, height) / 2 * 0.8;
    const centerX = width / 2;
    const centerY = height / 2 + radius * 0.2; 

    
    const gaugeColor = color ;
    const backgroundColor = bgcolor;

    const arcBackground = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI/2) // 180°
      .endAngle(Math.PI/2)         // 0°
      .cornerRadius(5);

    const arcForeground = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI /2 + (value / 100) * Math.PI)
      .endAngle(-Math.PI /2)
      .cornerRadius(5);

    const g = svg.append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);

    // Draw background arc
    g.append('path')
      .attr('d', arcBackground())
      .attr('fill', backgroundColor);

    // Draw foreground arc
    g.append('path')
      .attr('d', arcForeground())
      .attr('fill', backgroundColor);

    // Needle
    const needleLength = radius * 0.9;
    const needleBaseRadius = radius * 0.07;

    // Base path pointing up (to top)
    const needlePathBase = `M ${-needleBaseRadius} 0 L 0 ${-needleLength} L ${needleBaseRadius} 0 Z`;

    // Rotate from left (180°) to right (0°)
    const rotationAngleDegrees = -90 + (value / 100) * 180;

    g.append('path')
      .attr('d', needlePathBase)
      .attr('fill', gaugeColor)
      .attr('transform', `rotate(${rotationAngleDegrees})`);

    // Center circle
    g.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius * 0.07)
      .attr('fill', gaugeColor)
      .attr('stroke', 'white')
      .attr('stroke-width', 0);

  }, [value, color]);

  useEffect(() => {
    drawGauge();
    const handleResize = () => drawGauge();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawGauge]);

  return <svg ref={svgRef} width={200}
    height={200}></svg>;
};


// Custom SVG-based Speedometer chart
const renderSpeedometerChart = (title, missionImpactValue) => {

  let needleColorchart = ''; 
  let pieColorchart = ''; 
  if (title === 'Personal Wellbeing') {
    needleColorchart = '#2C60EA'; 
    pieColorchart = '#AFB7FF';
  } else if (title === 'Community Wellbeing') {
    needleColorchart = '#D766FF'; 
    pieColorchart = '#EFADFF';
  } else {
    needleColorchart = '#FF67BB'; 
    pieColorchart = '#FFC0E2';
  }
  

  return (
    <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems="center">
      
      <Box display="flex" flexDirection="column" justifyContent={'center'} alignItems="center" >
        {/* <ReactSpeedometer
            value={missionImpactValue}
            maxValue={100}
            needleColor={needleColorchart}
            startColor={pieColorchart}
            segments={1}
            forceRender={true}
            currentValueText={`${missionImpactValue}`}
            valueTextFontSize="18px"
            labelFontSize="0px"
            needleTransitionDuration={1000}
            needleTransition="easeElastic"
            ringWidth={25}
            height={150}
            width={150}
        /> */}

        <D3Gauge value={missionImpactValue} color={needleColorchart} bgcolor={pieColorchart} />
      </Box>
       <Typography variant="body2" textAlign="center" sx={{position: "relative", top:-65, fontSize: '18px', fontWeight: 600, }}>
        {missionImpactValue}
      </Typography>
      <Typography variant="body2" textAlign="center"sx={{position: "relative", top:-65, }}>
        {title}
      </Typography>
    </Box>
  );
};

const CoreMetrics = () => {

  const [genderM, setgenderM] = useState(0);
  const [genderF, setgenderF] = useState(0);
  const [childrenYes, setchildrenYes] = useState(0);
  const [childrenNo, setchildrenNo] = useState(0);
  const [dependantsYes, setdependantsYes] = useState(0);
  const [dependantsNo, setdependantsNo] = useState(0);
  const [marriedYes, setmarriedYes] = useState(0);
  const [marriedNo, setmarriedNo] = useState(0);

  const [layerSingle, setlayerSingle] = useState(0);
  const [layerDeeper, setlayerDeeper] = useState(0);
  const [layerRepeat, setlayerRepeat] = useState(0);
  const [layerOther, setlayerOther] = useState(0);


  const [thisMonthCount, setthisMonthCount] = useState(0);
  const [lastMonthCount, setlastMonthCount] = useState(0);
  const [avgCount, setavgCount] = useState(0);
  const [maxCount, setmaxCount] = useState(0);


  const [count15_24, setCount15_24] = useState(0);
  const [count25_34, setCount25_34] = useState(0);
  const [count35_44, setCount35_44] = useState(0);
  const [count45_54, setCount45_54] = useState(0);
  const [count55Plus, setCount55Plus] = useState(0);

  const [maxCountAgeGroup, setmaxCountAgeGroup] = useState(0);


  const [checkInScore, setcheckInScore] = useState(0);
  const [personalWellbeing, setpersonalWellbeing] = useState(0);
  const [communityWellbeing, setcommunityWellbeing] = useState(0);
  const [spiritualWellbeing, setspiritualWellbeing] = useState(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const locationId = params.get('location_id') || 'V7jzbIYZWXwQXczlF32Z';




  




    useEffect(() => {
    const fetchData = async () => {
        const profile_data = await get_profile_data();
        const layer_segment_data = await get_layer_segment_data();
        const participant_data = await get_participant_data();
        const score_data = await get_score_data();
        if (profile_data && layer_segment_data && participant_data && score_data) {

            const genderM = profile_data.gender.male;
            const genderF = profile_data.gender.female;

            const gendertotal = genderM + genderF;
            const percentagegenderM = (genderM / gendertotal) * 100;
            const percentagegenderF = (genderF / gendertotal) * 100;

            setgenderM(parseFloat(percentagegenderM.toFixed(2)));
            setgenderF(parseFloat(percentagegenderF.toFixed(2)));

            const childrenY = profile_data.children.yes;
            const childrenN = profile_data.children.no;

            const childrentotal = childrenY + childrenN;
            const percentagechildrenY = (childrenY / childrentotal) * 100;
            const percentagechildrenN = (childrenN / childrentotal) * 100;

            setchildrenYes(parseFloat(percentagechildrenY.toFixed(2)));
            setchildrenNo(parseFloat(percentagechildrenN.toFixed(2)));


            const dependantsY = profile_data.dependants.yes;
            const dependantsN = profile_data.dependants.no;

            const dependantstotal = dependantsY + dependantsN;
            const percentagedependantsY = (dependantsY / dependantstotal) * 100;
            const percentagedependantsN = (dependantsN / dependantstotal) * 100;

            setdependantsYes(parseFloat(percentagedependantsY.toFixed(2)));
            setdependantsNo(parseFloat(percentagedependantsN.toFixed(2)));

            
            const marriedY = profile_data.married.yes;
            const marriedN = profile_data.married.no;

            const marriedtotal = marriedY + marriedN;
            const percentagemarriedY = (marriedY / marriedtotal) * 100;
            const percentagemarriedN = (marriedN / marriedtotal) * 100;

            setmarriedYes(parseFloat(percentagemarriedY.toFixed(2)));
            setmarriedNo(parseFloat(percentagemarriedN.toFixed(2)));


            const layer_single = layer_segment_data.layers.Single;
            const layer_deeper = layer_segment_data.layers.Deeper;
            const layer_repeat = layer_segment_data.layers.Repeat;
            const layer_other = layer_segment_data.layers.Other;

           

            const layers_total = layer_single + layer_deeper + layer_repeat + layer_other;


            

            const percentagelayersSingle = (layer_single / layers_total) * 100;
            const percentagelayersDeeper = (layer_deeper / layers_total) * 100;
            const percentagelayersRepeat = (layer_repeat / layers_total) * 100;
            const percentagelayersOther = (layer_other / layers_total) * 100;

            setlayerSingle(parseFloat(percentagelayersSingle.toFixed(2)));
            setlayerDeeper(parseFloat(percentagelayersDeeper.toFixed(2)));
            setlayerRepeat(parseFloat(percentagelayersRepeat.toFixed(2)));
            setlayerOther(parseFloat(percentagelayersOther.toFixed(2)));

            const thisMonth = participant_data.this_month_count;
            const lastMonth = participant_data.last_month_count;
            const avgMonth = participant_data.average_per_month;
            const maxCount = Math.max(thisMonth, lastMonth, avgMonth);
            const chartMaxp = Math.ceil(maxCount / 50) * 50 + 100; 

            setmaxCount(chartMaxp);

            setthisMonthCount(thisMonth);
            setlastMonthCount(lastMonth);
            setavgCount(avgMonth);


            const ageData = participant_data.age_distribution;
            const count15_24 = ((ageData["15-17"] || 0) + (ageData["18-19"] || 0) + (ageData["20-24"] || 0));
            const count25_34 = ((ageData["25-29"] || 0) +(ageData["30-34"] || 0));
            const count35_44 = ((ageData["35-39"] || 0) +(ageData["40-44"] || 0));
            const count45_54 = ((ageData["45-49"] || 0) + (ageData["50-54"] || 0));
            const count55Plus = ((ageData["55+"] || 0));


            const maxCountAgeGroup = Math.max(count15_24, count25_34, count35_44, count45_54, count55Plus);
            const chartMaxAgeGroup = Math.ceil(maxCountAgeGroup / 50) * 50 + 100;

            setmaxCountAgeGroup(chartMaxAgeGroup);
            setCount15_24(count15_24);
            setCount25_34(count25_34);
            setCount35_44(count35_44);
            setCount45_54(count45_54);
            setCount55Plus(count55Plus);


            setcheckInScore(score_data.checkin_score);
            setpersonalWellbeing(score_data.personal_wellbeing);
            setcommunityWellbeing(score_data.community_wellbeing);
            setspiritualWellbeing(score_data.spiritual_wellbeing);

        }
    };

    fetchData();
    }, []);

    const get_profile_data = async () => {
      let url = new URL("https://score.impactindex.app/core_metrics/profiles/");
      if(locationId){
        url.searchParams.append("location_id", locationId);
      }
      try {
        const profiles_res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        const profiles_res_jsonData = await profiles_res.json();
        return profiles_res_jsonData;

      } catch (error) {
        console.error("Error fetching impact index data:", error);
        return null;
      }
    };

    const get_layer_segment_data = async () => {
      let url = new URL("https://score.impactindex.app/core_metrics/layers/");
      if(locationId){
        url.searchParams.append("location_id", locationId);
      }
      try {
        const layer_segment_res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        const layer_segment_res_jsonData = await layer_segment_res.json();
        return layer_segment_res_jsonData;

      } catch (error) {
        console.error("Error fetching impact index data:", error);
        return null;
      }
    };


    const get_participant_data = async () => {
      let url = new URL("https://score.impactindex.app/core_metrics/participants");
      if(locationId){
        url.searchParams.append("location_id", locationId);
      }
      try {
        const participant_res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        const participant_res_jsonData = await participant_res.json();
        return participant_res_jsonData;

      } catch (error) {
        console.error("Error fetching impact index data:", error);
        return null;
      }
    };

    const get_score_data = async () => {
      let url = new URL("https://score.impactindex.app/core_metrics/circles/");
      if(locationId){
        url.searchParams.append("location_id", locationId);
      }
      try {
        const score_res = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        const score_res_jsonData = await score_res.json();
        return score_res_jsonData;

      } catch (error) {
        console.error("Error fetching impact index data:", error);
        return null;
      }
    };

  


  return (
    <Box sx={{ width: '95vw', p: {lg:4, md:4, xs:1}, bgcolor: '#F8FAFC', boxSizing: 'border-box', backgroundColor: '#E5EAFB'}} >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          height: 'auto',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
          
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign={{ xs: 'center', md: 'left' }} sx={{fontSize: '3rem'}}>
          Core Metrics
        </Typography>
      </Box>

      {/* Charts Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column', lg: 'row' },
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 3,
          minHeight: '100vh',
        }}
      >

          <Box
            sx={{
              display: 'flex',
              width: { xs: '100%', md: '100%', lg: '75%' },
              flexDirection: { xs: 'row', md: 'row' },
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 3,
            }}
          >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        gap: 3,
                        // border: '1px solid red',
                    }}
                >

                     <Box
                            sx={{
                                width:{lg: '30%', md: '30%', xs: '100%'},
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'column' },
                                justifyContent: 'center',
                                alignItems: 'stretch',
                                gap: 3,
                                // border: '1px solid red',
                            }}
                        >

                                            {/* Reach Score */}
                                            <Paper sx={{ p: {md:1, lg:3,xs:2}, flex: 1, textAlign: 'center', minHeight: 550, borderRadius: 4 }}>
                                              {renderProfileChart(genderM, genderF, childrenYes, childrenNo, dependantsYes, dependantsNo, marriedYes, marriedNo)}
                                            </Paper>
                                            {/* Reach Score */}
                                            <Paper sx={{ display: 'flex', justifyContent: 'center', p: 3, flex: 1, textAlign: 'center', minHeight: 100, borderRadius: 4 }}>
                                                {renderTheCheckInScore(checkInScore)}
                                            </Paper>
                            

                    </Box>
                     <Box
                            sx={{
                                width:{lg: '70%', md: '70%', xs: '100%'},
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'column' },
                                justifyContent: 'center',
                                alignItems: 'stretch',
                                gap: 3,
                                // border: '1px solid red',
                            }}
                        >

                                            {/* Reach Score */}
                                            <Paper sx={{ p: {md:1, lg:3,xs:2}, flex: 1, textAlign: 'center', borderRadius: 4 }}>
                                                {renderPatientChart(thisMonthCount, lastMonthCount, avgCount,maxCount)}
                                            </Paper>

                                             {/* Reach Score */}
                                            <Paper sx={{ p: {md:1, lg:3,xs:2}, flex: 1, textAlign: 'center',  borderRadius: 4 }}>
                                                {renderPatientAgeChart(count15_24, count25_34, count35_44, count45_54, count55Plus, maxCountAgeGroup)}
                                            </Paper>
                            <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        justifyContent: 'center',
                                        alignItems: 'stretch',
                                        gap: 3,
                                        // border: '1px solid red',
                                    }}
                                >

                                     
                                    <Paper sx={{flex: 1, textAlign: 'center', minHeight: 100, borderRadius: 4  }}>
                                    {renderSpeedometerChart('Personal Wellbeing', personalWellbeing)}
                                    </Paper>
                                    <Paper sx={{flex: 1, textAlign: 'center', minHeight: 100, borderRadius: 4  }}>
                                    {renderSpeedometerChart('Community Wellbeing', communityWellbeing)}
                                    </Paper>
                                    <Paper sx={{flex: 1, textAlign: 'center', minHeight: 100, borderRadius: 4  }}>
                                    {renderSpeedometerChart('Spiritual Wellbeing',spiritualWellbeing)}
                                    </Paper>
                                    
                         </Box>

                    </Box>


                </Box>

          </Box>

          <Box
            sx={{
              display: 'flex',
              width: { xs: '100%', md: '100%', lg: '25%' },
              flexDirection: { xs: 'row', md: 'row' },
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 3,
            }}
          >



             <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        gap: 3,
                        // border: '1px solid red',

                    }}
                >

                                            {/* Reach Score */}
                                            <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 100, borderRadius: 4 }}>
                                                {layerSegmentChart(layerSingle, layerDeeper, layerRepeat, layerOther)}
                                            </Paper>

                </Box>

            </Box>
         
      </Box>
    </Box>
  );
};

export default CoreMetrics;
