import React,{useState,useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {User} from "../types"
import {  useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { Box, Typography } from '@mui/material';

function calculateAge(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  

const Charts = () => {
    Chart.register(...registerables);
    const data = useSelector((state:RootState) => state.users);

    
    const [userData, setUserData] = useState<User[]>(data);

  useEffect(() => {
    const filteredData = userData.filter(user => calculateAge(user.dob) > 30);
    setUserData(filteredData);
  }, []);

  //chart1

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Gender',
        data: [],
        backgroundColor: '#3e95cd',
        borderColor: '#3e95cd',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor:string[]=[];
    const borderColor:string[]=[];
    userData.forEach(user => {
      labels.push(`${user.first_name} ${user.last_name}`);
      data.push(calculateAge(user.dob));
      backgroundColor.push(user.gender === 'Male' ? '#3e95cd' : '#FF69B4');
      borderColor.push(user.gender === 'Male' ? '#3e95cd' : '#FF69B4');

    });
    setChartData({
      labels,
      datasets: [
        {
          label: 'Age',
          data,
          backgroundColor,
          borderColor:"black",
          borderWidth: 2,
        },
      ],
    });
  }, [userData]);

  //chart2

  interface UsersByCountry {
    [key: string]: User[];
  }

  const usersByCountry = data.reduce((acc:UsersByCountry, user) => {
    const { country } = user;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(user);
    return acc;
  }, {});

  console.log(usersByCountry)

  const [anotherChartData, setAnotherChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Country',
        data: [],
        backgroundColor: '#3e95cd',
        borderColor: '#3e95cd',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColor: string[] = ["red","green","blue","purple","orange"];

        for (const key in usersByCountry) {
            // console.log(key); // outputs USA, New Zealand, Canada, Australia, India
        
            const users = usersByCountry[key];
            labels.push(`${key}`);
            data.push(users.length);
        }

    setAnotherChartData({
      labels,
      datasets: [
        {
          label: 'Users',
          data,
          backgroundColor,
          borderColor:"black",
          borderWidth: 2,
        },
      ],
    });
  }, [userData]);

  

  return (<>
  <Box sx={{textAlign:"center",backgroundColor:"whitesmoke",my:"5rem",padding:"2rem"}}>
    <Typography variant='h3'>User (Only who're above 30) vs Age</Typography>
    <Bar data={chartData} />
  </Box>
  <Box sx={{textAlign:"center",backgroundColor:"whitesmoke",my:"5rem",padding:"2rem"}}>
    <br/>
    <Typography variant='h3'>Country vs Users</Typography>
    <Bar data={anotherChartData} options={{
    plugins: {
      legend: {
        position: 'left', // can be 'top', 'bottom', 'left', 'right'
        labels: {
          font: {
            size: 14, // set the font size for legend labels
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label;
            const dataset = tooltipItem.datasetIndex;
            const value = tooltipItem.formattedValue;
            const datasetLabel = tooltipItem.dataset.label;
            const total:number = anotherChartData.datasets[dataset].data.reduce((acc:any, curr:any) =>acc+curr,0);
            // console.log(`\n ${totalparseInt(value)}`);
            const percent = ((parseInt(value) / total) * 100).toFixed(2);
            return `${datasetLabel}: ${percent}% Total:${total} `;
          }
        },  
      },
    },
  }}/>
  </Box>
  </>
  );
};

export default Charts;
