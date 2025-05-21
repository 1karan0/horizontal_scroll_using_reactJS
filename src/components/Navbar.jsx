import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const Navbar = () => {
  const data = [
    {
      name: 'Page A',
      
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
     
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    
    
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8"  activeBar={<Rectangle fill="pink" stroke="blue" className='rounded-t-xl'/>} />
      <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" className='rounded-t-xl'/>} />
    </BarChart>
  
    
  );
}

export default Navbar
