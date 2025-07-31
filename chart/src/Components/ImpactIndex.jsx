import React, { useRef, useEffect, useState , useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 

import { Box, Paper, Typography, Grid } from '@mui/material';
// D3.js Imports
import * as d3 from 'd3';

ChartJS.register(ArcElement, Tooltip, Legend);

const renderGaugeChart = (value, title, description, color, max = 100) => {

    let fontsizecard = '';
    let piebgcolor = "" ;


    if( title === 'Reach Score' ){
      fontsizecard = '1.25rem';
      piebgcolor = '#FFE2F2';

    }else if( title === 'Contribution Score' ){
      fontsizecard = '2.25rem';
      piebgcolor = '#F9DFFF';

    }


  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: [color, piebgcolor],
        borderColor: [color, piebgcolor],
        borderWidth: 0,
        borderRadius: 0,
      },
    ],
  };

  const options = {
    rotation: 0,
    circumference: 360,
    cutout: '60%',
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }, 
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3" sx={{ fontSize: fontsizecard , fontWeight: 'bold', color: '#333' }}>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 200, height: 200 }}>
        <Doughnut data={data} options={options} />
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {value}%
        </Typography>
      </Box>
      <Typography variant="body2" textAlign="center">
        {description}
      </Typography>
    </Box>
  );
};



const D3Gauge = ({ value, color }) => {
  const svgRef = useRef();

  const drawGauge = useCallback(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svg.node().clientWidth;
    const height = svg.node().clientHeight;
    const radius = Math.min(width, height) / 2 * 1;
    const centerX = width / 2;
    const centerY = height / 2 + radius * 0.2; 

    const COLORS = {
      indigo: '#818CF8',
      purple: '#A78BFA',
      pink: '#F472B6',
    };
    const gaugeColor = COLORS[color] || '#D766FF';
    const backgroundColor = '#EFADFF';

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
      .attr('fill', gaugeColor);

    // Needle
    const needleLength = radius * 0.6;
    const needleBaseRadius = radius * 0.08;

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
      .attr('r', radius * 0.08)
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


const renderSpeedometerChart = (missionImpactValue) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1.25rem' , fontWeight: 'bold', color: '#333' }}>
        Mission-wide Impact Index
      </Typography>
      <Box sx={{ height: 200, width: "100%" }}>
        {/* <ReactSpeedometer
          value={missionImpactValue}
          maxValue={100}
          needleColor="#D766FF"
          startColor="#EFADFF"
          endColor="#D8B4FE"
          segments={1}
          forceRender={true}
          currentValueText={`${missionImpactValue}/100`}
          valueTextFontSize="22px"
          labelFontSize="0px"
          needleTransitionDuration={1000}
          needleTransition="easeElastic"
          ringWidth={40}
          height={200 }
          width={300}
        /> */}
        <D3Gauge value={missionImpactValue} color={"#D766FF"} sx={{width:"100%", height: "100%"}}/>
      </Box>
      <Typography variant="h6" component="h3" sx={{ fontSize: '1.25rem' , fontWeight: 'bold', color: '#333' , position: 'relative', top: -40 }} mt={-6} >
        {missionImpactValue}%
      </Typography>
      <Typography variant="body2" textAlign="center">
        It is estimated that TheLight's missional impact contributes an additional {missionImpactValue}% to all of Melbourne's Wellbeing.
      </Typography>
    </Box>
  );
};

const ImpactIndex = () => {

    const [widthScore, setWidthScore] = useState(0);
    const [contributionScore, setContributionScore] = useState(0);
    const [impactIndex, setImpactIndex] = useState(0);

    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const locationId = params.get('location_id') || 'V7jzbIYZWXwQXczlF32Z';

    const reachScoreValue = impactIndex;
    const contributionScoreValue = contributionScore;
    const missionImpactValue = widthScore;


    useEffect(() => {
      const fetchData = async () => {
        const data = await get_impact_index_data();
        if (data) {

          setWidthScore(data?.width_score || 0);
          setContributionScore(data?.contribution_score || 0);
          setImpactIndex(data?.impact_index || 0);
        }
      };

      fetchData();
    }, []);

    const get_impact_index_data = async () => {

      let url = new URL("https://score.impactindex.app/impact_index/");
      if(locationId){
        url.searchParams.append("location_id", locationId);
      }
      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error("Error fetching impact index data:", error);
        return null;
      }
    };

  


  return (
    <Box sx={{ width: '95vw',  bgcolor: '#F8FAFC', p: 4, boxSizing: 'border-box', backgroundColor: '#E5EAFB',}}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          height: '120px',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          gap: 2,
          
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign={{ xs: 'center', md: 'left' }} sx={{fontSize: '3rem'}}>
          IMPACT INDEX
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: 'italic', textAlign: { xs: 'center', md: 'center' }, maxWidth: 400 , fontSize: '1.4rem' }}
        >
          It is estimated that TheLight contributes an increase to someone's Personal, Community,
          and Spiritual Wellbeing by 25%.
        </Typography>
      </Box>

      {/* Charts Row */}
      <Box
        mt={{md:6, sm:20, xs: 15}}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column',lg:'row', md: 'column', sm:'column' },
          justifyContent: 'center',
          alignItems: 'stretch',
          gap: 3,

          
        }}
      >

          <Box
            sx={{
              display: 'flex',
              width: { xs: '100%',lg:'50%', md: '100%', sm:'100%' },
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 3,
            }}
          >
                {/* Reach Score */}
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 300, borderRadius: 4 }}>
                  {renderGaugeChart(
                    reachScoreValue,
                    'Reach Score',
                    `It is estimated that TheLight is reaching ${reachScoreValue}% of the Target Achievable Mission.`,
                    '#FF67BB'
                  )}
                </Paper>

                {/* Speedometer */}
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 350,borderRadius: 4  }}>
                  {renderSpeedometerChart(missionImpactValue)}
                </Paper>
            
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: {  xs: '100%',lg:'50%', md: '100%', sm:'100%'  },
              flexDirection: { xs: 'row', md: 'row' ,sm: 'row'},
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 3,
            }}
          >

          {/* Contribution Score */}
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 350 , borderRadius: 4 }}>
            {renderGaugeChart(
              contributionScoreValue,
              'Contribution Score',
              `It is estimated that TheLight contributes an increase to someone's Personal, Community, and Spiritual Wellbeing by ${contributionScoreValue}%.`,
              '#D766FF'
            )}
          </Paper>
            
          </Box>
         
      </Box>
    </Box>
  );
};

export default ImpactIndex;
