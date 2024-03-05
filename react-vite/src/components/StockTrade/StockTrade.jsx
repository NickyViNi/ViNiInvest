// // import { useState, useEffect } from 'react';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// // import { Line } from 'react-chartjs-2';
// // import Chart from 'chart.js/auto';
// import 'chartjs-plugin-style';
// import { Candlestick } from 'react-chartjs-2';
// // import 'chartjs-plugin-candlestick';
// // Chart.register(Candlestick);

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


// const stockData = [
//     {
//       date: new Date(2023, 11, 1),
//       open: 100,
//       high: 105,
//       low: 95,
//       close: 102,
//     },
//     {
//         date: new Date(2023, 11, 2),
//         open: 80,
//         high: 100,
//         low: 60,
//         close: 70,
//     },
//     {
//         date: new Date(2023, 11, 3),
//         open: 90,
//         high: 110,
//         low: 60,
//         close: 80,
//     },
//     {
//         date: new Date(2023, 11, 4),
//         open: 130,
//         high: 140,
//         low: 90,
//         close: 135,
//     },
//   ];

//   const StockChart = () => {
//     // const [data, setData] = useState([]);

//     // useEffect(() => {
//     //   const fetchStockData =  () => {

//     //     // const response = await fetch(`https://...your_api_endpoint...?symbol=${symbol}`);
//     //     // const data = await response.json();
//     //     setData(stockData.map((item) => ({
//     //       // Map data properties as needed by Chart.js
//     //       t: item.date, // Replace with appropriate time property name
//     //       o: item.open,
//     //       h: item.high,
//     //       l: item.low,
//     //       c: item.close,
//     //     })));
//     //   };

//     //   fetchStockData();
//     // }, []);
//     const data = {
//       labels: stockData.map((item) => item.date), // Extract labels
//       datasets: [
//         {
//           label: 'Stock Price',
//           data: stockData.map((item) => ({
//             x: item.date, // Use "x" as the timestamp property
//             o: item.open, // Opening price
//             h: item.high, // High price
//             l: item.low, // Low price
//             c: item.close, // Closing price
//           })),
//         },
//       ],
//     };

//     const chartOptions = {
//       // Customize chart options, e.g., scales, labels, tooltips
//       scales: {
//         y: {
//           beginAtZero: false,
//         },
//       },
//     };

//     return (
//       <div>
//         <h2 style={{marginTop:"100px"}}>K-Line Chart for stock</h2>
//         <Candlestick data={{ datasets: [{ data }] }} options={chartOptions} />
//       </div>
//     );
//   };

function StockChart() {

    return (
      <div>
        <h2 style={{marginTop:"100px"}}>Stocks Details</h2>
        {/* <Line data={data} options={options} ref={chartRef}/> */}
      </div>
    );
}



export default StockChart;
