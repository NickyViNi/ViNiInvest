import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useRef } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);

const stockData = [
    {
      date: new Date(2023, 11, 1), // Adjust date format as needed
      open: 100,
      high: 105,
      low: 95,
      close: 102,
    },
    {
        date: new Date(2023, 11, 2), // Adjust date format as needed
        open: 80,
        high: 100,
        low: 60,
        close: 70,
    },
    {
        date: new Date(2023, 11, 3), // Adjust date format as needed
        open: 90,
        high: 110,
        low: 60,
        close: 80,
    },
    {
        date: new Date(2023, 11, 4), // Adjust date format as needed
        open: 130,
        high: 140,
        low: 90,
        close: 135,
    },

  ];


const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    // Customize other chart options as needed (e.g., colors, labels, etc.)
  };

const chartData = {
    datasets: [
      {
        label: 'Stock Price',
        data: stockData.map(point => ({
          x: point.date, // Use appropriate date format for chart.js
          y: point.close,
        })),
        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
        backgroundColor: point => (point.close > point.open ? 'red' : 'green'),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 3,
        pointHitRadius: 5, // Adjust hover area for data points
        barPercentage: 0.5, // Adjust bar width for K-line style
      },
    ],
};

// const componentWillUnmount = () => {
//     if (this.chartRef) {
//       this.chartRef.current.destroy();
//     }
// }


function StockChart() {
    const [data, setData] = useState(chartData);

    const chartRef = useRef(null);
    useEffect(() => {
        // Create the chart instance
        // ...

        return () => {
          // Cleanup function: destroy chart on unmount
          if (chartRef.current) {
            chartRef.current.destroy();
          }
        };
      }, []);

    // Fetch data or update data as needed (optional)

    return (
      <div>
        <Line data={data} options={options} />
      </div>
    );
  }

  export default StockChart;
