import React, {  useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 

import { Box, Paper, Typography, Grid } from '@mui/material';


ChartJS.register(ArcElement, Tooltip, Legend);


const renderGaugeChart2 = (value, title, description, color, max = 100) => {

    let fontsizecard = '';
    let piebgcolor = "" ;


    if( title === 'Reach Score' ){
      fontsizecard = '1.25rem';
      piebgcolor = '#0000001a';

    }else if( title === 'Mission-wide Impact Index' ){
      fontsizecard = '1.25rem';
      piebgcolor = '#0000001a';

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
    cutout: '85%',
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
            fontWeight: 'bold',
            backgroundColor: color,
            borderRadius: "50%", 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: '150px', 
            minHeight: '150px',
            boxSizing: 'border-box' 
          }}
        >
          {value}
        </Typography>
  
      </Box>
      <Typography variant="body2" textAlign="center" sx={{fontSize:"1em"}} mt={5}>
        {description}
      </Typography>
    </Box>
  );
};


const renderGaugeChartContribution = (value, title, description, color, max, min, mid) => {

  console.log("Color", color);
  

    let fontsizecard = '';
    let piebgcolor = "" ;


    if( title === 'Contribution Score' ){
      fontsizecard = '1.25rem';
      piebgcolor = '#0000001a';

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
    cutout: '85%',
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
            fontWeight: 'bold',
            backgroundColor: color,
            borderRadius: "50%", 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minWidth: '150px', 
            minHeight: '150px',
            boxSizing: 'border-box' 
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={3}>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"1em"}}>
           <i class="ri-square-fill" style={{marginLeft: '3px', color:'red'}}></i> 0-{min}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"1em"}}>
           <i class="ri-square-fill" style={{marginLeft: '3px', color:'orange'}}></i> {min}-{mid}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"1em"}}>
           <i class="ri-square-fill" style={{marginLeft: '3px', color:'green'}}></i> {mid}-{max}
          </Typography>
      </Box>
      <Typography variant="body2" textAlign="center" sx={{fontSize:"1em"}}>
        {description}
      </Typography>
    </Box>
  );
};

const ImpactIndex = () => {

    const [widthScore, setWidthScore] = useState(0);
    const [contributionScore, setContributionScore] = useState(0);
    const [impactIndex, setImpactIndex] = useState(0);

    const [contributionScoreMid, setContributionScoreMid] = useState(0);
    const [contributionScoreLow, setContributionScoreLow] = useState(0);
    const [contributionScoreHigh, setContributionScoreHigh] = useState(0);

    const [conColor, setConColor] = useState('');

    
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

        const contributionScore = data.contribution_score || 0;
        const c_low = data.contribution_lower || 0;
        const c_mid = data.contribution_mid || 0;
        const c_high = data.contribution_upper_bound || 0;

        setContributionScoreMid(c_mid);
        setContributionScoreLow(c_low);
        setContributionScoreHigh(c_high);
        setContributionScore(contributionScore);
        setWidthScore(data.width_score || 0);
        setImpactIndex(data.impact_index || 0);

        if (contributionScore < c_low) {
          setConColor('red');
        } else if (contributionScore >= c_low && contributionScore < c_mid) {
          setConColor('orange');
        } else if (contributionScore >= c_mid && contributionScore <= c_high) {
          setConColor('green');
        } else {
          // Handle case where score is greater than high bound
          setConColor('blue'); // or some other color
        }
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
    <Box sx={{ width: '95vw',  bgcolor: '#F8FAFC', p: {lg:4, md:4, xs:1}, boxSizing: 'border-box', backgroundColor: '#E5EAFB',}}>
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
          sx={{ fontStyle: 'italic', textAlign: { xs: 'center', md: 'center' }, maxWidth: 400 , fontSize: '1.4rem' , fontWeight: "bold"}}
        >
          It is estimated that TheLight contributes an increase to someone's Personal, Community,
          and Spiritual Wellbeing by 25%.
        </Typography>
      </Box>

   
      {/* Charts Row 3 */}
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

         
                {/* Reach Score */}
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400, borderRadius: 4 }}>
                  {renderGaugeChart2(
                    reachScoreValue,
                    'Reach Score',
                    `It is estimated that TheLight is reaching ${reachScoreValue}% of the Target Achievable Mission.`,
                    '#FF67BB'
                  )}
                </Paper>

                {/* Speedometer */}
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400,borderRadius: 4  }}>
                  {renderGaugeChart2(
                    missionImpactValue,
                    'Mission-wide Impact Index',
                    `It is estimated that TheLight’s missional impact contributes an additional ${missionImpactValue}% to all of Melbourne’s Wellbeing`,
                    '#D766FF'
                  )}
                </Paper>
  

                {/* Contribution Score */}
                <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400 , borderRadius: 4 }}>
                  {renderGaugeChartContribution(
                    contributionScoreValue,
                    'Contribution Score',
                    `It is estimated that TheLight contributes an increase to someone's Personal, Community, and Spiritual Wellbeing by ${contributionScoreValue}%.`,
                    conColor,
                    contributionScoreHigh,
                    contributionScoreLow,
                    contributionScoreMid
                  )}
                </Paper>
        
         
      </Box>
    </Box>
  );
};

export default ImpactIndex;
