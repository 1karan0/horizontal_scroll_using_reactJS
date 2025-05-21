// WordGenerationChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WordGenerationChart = () => {
  // Define the data for the chart
  const data = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`), // Labels for the last 30 days
    datasets: [
      {
        label: 'Words Generated',
        data: [
          300, 400, 350, 600, 0, 150, 200, 100, 0, 0,
          500, 600, 0, 250, 300, 100, 0, 800, 450, 500,
          550, 600, 650, 0, 0, 350, 400, 150, 200, 650
        ], // Example data
        backgroundColor: '#bcbec2', // Bar color
        borderColor: '#a0a3a8', // Border color
        borderWidth: 1,
        borderRadius: 5, // Rounded corners
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: true,
        text: 'Word Generation',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: '#3c3f4a', // Grid line color
        },
        min: 0,
        max: 1000, // Max value for the y-axis
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default WordGenerationChart;
