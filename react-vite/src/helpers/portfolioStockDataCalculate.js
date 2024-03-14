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


export function calculateAverageCostPerShare(transactions, portfolioArray) {
  const stockData = {};

  if (transactions) { for (const transaction of transactions) {

    const stockName = transaction.stock.name;
    const price_per_unit = transaction.price_per_unit;
    const shares = transaction.shares;
    const transactionType = transaction.type;

    if (!stockData[stockName]) {
      stockData[stockName] = { totalCost: 0, totalShares: 0 };
    }

    if (transactionType === "buy") {
      stockData[stockName].totalCost += price_per_unit * shares;
      stockData[stockName].totalShares += shares;
    } else if (transactionType === "sell") {
      // Handle potential sell transactions exceeding bought shares (assuming FIFO method for selling)
      const sellAmount = Math.min(shares, stockData[stockName].totalShares);
      stockData[stockName].totalShares -= sellAmount;
      stockData[stockName].totalCost -= price_per_unit * sellAmount;
    }
  } }

  const averageCostPerShare = {};
  for (const stockName in stockData) {
    const { totalCost, totalShares } = stockData[stockName];
    averageCostPerShare[stockName] = totalShares > 0 ? totalCost / totalShares : 0;
  }

  const stocksName = Object.keys(averageCostPerShare);
  for ( let stockName of stocksName) {
    for (let i = 0; i < portfolioArray.length; i++) {
      if ( stockName == portfolioArray[i].stock.name) {
        portfolioArray[i].cost_per_share = averageCostPerShare[stockName];
        break;
      }
    }
  }

  // return averageCostPerShare;
  return portfolioArray;
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
