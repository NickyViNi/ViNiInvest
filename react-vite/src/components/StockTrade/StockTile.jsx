import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
import convertDate from '../../helpers/convertDate';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const StockTile = ({stock}) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${stock.name} (${stock.symbol})`,
        },
      },
    };

    const labels = stock.prices.sort((a, b) => b.id - a.id).map(p => convertDate(p.date))

    const data = {
      labels,
      datasets: [
        {
          label: 'Open Price',
          data: stock.prices.sort((a, b) => b.id - a.id).map(p => p.open_price),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Close Price',
          data: stock.prices.sort((a, b) => b.id - a.id).map(p => p.close_price),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    return (
        <div id="stock-tile-container">
             <Line options={options} data={data} />
        </div>
    )
}

export default StockTile;
