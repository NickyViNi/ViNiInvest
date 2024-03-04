export const stockDataCalculate = (stocks) => {
  const stockData = {};
  stocks.forEach(s => {
    let stockName = s.stock.name;
    // stockData[stockName] = {};
    // stockData[stockName].id = s.stock_id;
    // stockData[stockName].name = s.stock.name;
    if ( s.quantity > 0) {
      stockData[stockName] = (s.quantity * s.stock?.newest_price.close_price).toFixed(2)
    }

  })

  return stockData;
}








// export const stockDataCalculate = (transactions) => {
//     const stockData = {};
//     transactions?.forEach(order => {
//       let stockName = order.stock.name
//       if (!stockData[stockName]) {
//         stockData[stockName] = {};
//         stockData[stockName].name = stockName;
//         stockData[stockName].id = order.id;
//         if (order.type === "buy") {
//             stockData[stockName].shares = order.shares;
//             stockData[stockName].value = parseFloat((order.shares * order.price_per_unit).toFixed(2));
//           } else {
//             stockData[stockName].shares = -order.shares;
//             stockData[stockName].value = parseFloat((-order.shares * order.price_per_unit).toFixed(2));
//         }
//       } else {
//         if (order.type === "buy") {
//           stockData[stockName].shares += order.shares;
//           stockData[stockName].value += parseFloat((order.shares * order.price_per_unit).toFixed(2));
//         } else {
//           stockData[stockName].shares -= order.shares;
//           stockData[stockName].value -= parseFloat((order.shares * order.price_per_unit).toFixed(2));
//         }
//       }
//     })
//     return stockData;
//   }
