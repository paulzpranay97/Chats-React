import React, {  useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ReactSpeedometer from 'react-d3-speedometer'; 

import { Box, Paper, Typography, Grid } from '@mui/material';


ChartJS.register(ArcElement, Tooltip, Legend);




const renderGaugeChartContribution = (value, title,  color, max, min, mid) => {
  

    let fontsizecard = '1.25rem';
    let piebgcolor = "#0000001a" ;

    let neg = '';
    let neu = '';
    let pos = '';

    if(title.startsWith("Impact") || title === "Contribution Score"){
        neg = 'Negative';
        neu = 'Neutral';
        pos = 'Positive';
    }else {
        neg = 'Low';
        neu = 'Mid';
        pos = 'High';
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
      <Typography variant="h6" component="h3" sx={{ fontSize: '1.6rem' , fontWeight: 'bold', color: '#333' }}>
        {title}
      </Typography>
      <Box sx={{ position: 'relative', width: '100%',maxWidth: 300, height: 300 }}>
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
            minWidth: '200px', 
            minHeight: '200px',
            boxSizing: 'border-box' 
          }}
        >
          {value}
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'row'} gap={3}>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i class="ri-square-fill" style={{marginLeft: '3px', color:'red'}}></i> 0-{min} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color:'red'}}></i> {neg} 0-{min}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i className="ri-square-fill" sx={{marginLeft: '3px', color:'orange'}}></i> {min}-{mid} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color:'orange'}}></i> {neu} {min}-{mid}
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{fontSize:"0.8em" , fontWeight: "bold"}}>
           {/* <i className="ri-square-fill" sx={{marginLeft: '3px', color:'green'}}></i> {mid}-{max} */}
           <i className="ri-square-fill" style={{marginLeft: '3px', color:'green'}}></i> {pos} {mid}-{max}
          </Typography>
      </Box>
    </Box>
  );
};

const ImpactIndex = () => {

   
    const [reachScore, setReachScore] = useState(0);
    const [wideScore, setWideScore] = useState(0);
    const [wideScoreAA, setWideScoreAA] = useState(0);
    const [contributionScore, setContributionScore] = useState(0);
    const [contributionScoreb, setContributionScoreb] = useState(0);
    

    const [reachScoreMid, setReachScoreMid] = useState(0);
    const [reachScoreLow, setReachScoreLow] = useState(0);
    const [reachScoreHigh, setReachScoreHigh] = useState(0);

    const [wideScoreMid, setWideScoreMid] = useState(0);
    const [wideScoreLow, setWideScoreLow] = useState(0);
    const [wideScoreHigh, setWideScoreHigh] = useState(0);

    const [contributionScoreMid, setContributionScoreMid] = useState(0);
    const [contributionScoreLow, setContributionScoreLow] = useState(0);
    const [contributionScoreHigh, setContributionScoreHigh] = useState(0);

  

    const [conColor, setConColor] = useState('');
    const [reachColor, setReachColor] = useState('');
    const [wideColor, setWideColor] = useState('');

    
    const [locationName, setlocationName] = useState('');
    const [targetPopulation, setTargetPopulation] = useState('');
    const [locationDashboardName, setLocationDashboardName] = useState('');

    
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const locationId = params.get('location_id') || 'V7jzbIYZWXwQXczlF32Z';

    
    const reachScoreValue = reachScore;
    const wideScoreValue = wideScore;
    const contributionScoreValue = contributionScore;
    
   


    

useEffect(() => {
    const fetchData = async () => {
      const data = await get_impact_index_data();
      if (data) {
        

        const contributionScore = data.contribution_score_a || 0;
        const contributionScoreb = data.contribution_score_b || 0;
        const c_low = data.contribution_lower || 0;
        const c_mid = data.contribution_mid || 0;
        const c_high = data.contribution_upper_bound || 0;

        const reachScore = data.width_score || 0;
        const r_low = data.reach_lower || 0;
        const r_mid = data.reach_mid || 0;
        const r_high = data.reach_upper || 0;

        const wideScore = data.impact_index_b || 0;
        const wideScoreAA = data.impact_index_a || 0;
        const w_low = data.impact_lower || 0;
        const w_mid = data.impact_mid || 0;
        const w_high = data.impact_upper || 0;

        setlocationName(data.ghl_location_name || "")
        setTargetPopulation(data.target_population || "")
        setLocationDashboardName(data.location_dashboard_name || "")

        setContributionScoreMid(c_mid);
        setContributionScoreLow(c_low);
        setContributionScoreHigh(c_high);
        setContributionScore(contributionScore);
        setContributionScoreb(contributionScoreb);

        setReachScoreMid(r_mid);
        setReachScoreLow(r_low);
        setReachScoreHigh(r_high);
        setReachScore(reachScore);


        setWideScoreMid(w_mid);
        setWideScoreLow(w_low);
        setWideScoreHigh(w_high);
        setWideScore(wideScore);
        setWideScoreAA(wideScoreAA);

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


        if (reachScore < r_low) {
          setReachColor('red');
        } else if (reachScore >= r_low && reachScore < r_mid) {
          setReachColor('orange');
        } else if (reachScore >= r_mid && reachScore <= r_high) {
          setReachColor('green');
        } else {
          // Handle case where score is greater than high bound
          setReachColor('blue'); // or some other color
        }

        if (wideScore < w_low) {
          setWideColor('red');
        } else if (wideScore >= w_low && wideScore < w_mid) {
          setWideColor('orange');
        } else if (wideScore >= w_mid && wideScore <= w_high) {
          setWideColor('green');
        } else {
          // Handle case where score is greater than high bound
          setWideColor('blue'); // or some other color
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
   
      {/* Charts Row 3 */}
      <Box
        mt={{md:3, sm:3, xs: 3}}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column',lg:'row', md: 'column', sm:'column' },
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 3,
        }}
      >

                {/* Reach Score */}
                <Box sx={{ flex: 1 }} display={'flex'} flexDirection={'column'} gap={1}>
                  <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400, borderRadius: 4 }}>

                    {renderGaugeChartContribution(
                        reachScoreValue,
                        'Reach Score',
                        reachColor,
                        reachScoreHigh,
                        reachScoreLow,
                        reachScoreMid
                      )}
                   
                  </Paper>

                  <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 140, borderRadius: 4, display: 'flex', justifyContent:'center', alignItems: "center" }} mt={2}>
                      <Typography variant="body2" textAlign="center" sx={{ fontSize: "1.2rem", fontWeight:"bold" }}>
                      It is estimated that {locationName} is reaching{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {reachScoreValue}%
                      </span>{" "}
                      of the Target Achievable Mission.
                    </Typography>
                  </Paper>

                </Box >
                {/* Wide Score */}
                <Box sx={{ flex: 1 }} display={'flex'} flexDirection={'column'} gap={1}>
                      {/* Speedometer */}
                      <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400,borderRadius: 4  }}>

                      {renderGaugeChartContribution(
                        wideScoreValue,
                        `Impact on ${targetPopulation}`,
                        wideColor,
                        wideScoreHigh,
                        wideScoreLow,
                        wideScoreMid
                        
                      )}
                        
                      </Paper>

                      <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 140, borderRadius: 4, display: 'flex', justifyContent:'center', alignItems: "center" }} mt={2}>
                          <Typography variant="body2" textAlign="center" sx={{ fontSize: "1.2rem", fontWeight:"bold" }}>
                            The Impact Index estimates that {locationName} contributes an improvement of {wideScoreAA} to {targetPopulation}'s overall wellbeing, resulting in a score of {wideScore}.
                          </Typography>
                      </Paper>

                </Box>
                {/* Contribution Score */}
                <Box sx={{ flex: 1 }}  display={'flex'} flexDirection={'column'} gap={1}>
                     <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 400 , borderRadius: 4 }}>
                      {renderGaugeChartContribution(
                        contributionScoreValue,
                        'Contribution Score',
                        conColor,
                        contributionScoreHigh,
                        contributionScoreLow,
                        contributionScoreMid
                        
                      )}
                    </Paper>
                    <Paper sx={{ p: 3, flex: 1, textAlign: 'center', minHeight: 140, borderRadius: 4, display: 'flex', justifyContent:'center', alignItems: "center"}}>
                           <Typography variant="body2" textAlign="center" sx={{ fontSize: "1.2rem", fontWeight:"bold" }}>
                            The Impact Index estimates that {locationDashboardName} contributes an improvement of {contributionScoreb} to {locationDashboardName} community's overall wellbeing, resulting in a Contribution Score of  {contributionScore}.
                          </Typography>
                    </Paper>
                </Box>
               
         
      </Box>
    </Box>
  );
};

export default ImpactIndex;
