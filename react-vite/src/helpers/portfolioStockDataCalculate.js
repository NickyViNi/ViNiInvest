export const stockDataCalculate = (transactions) => {
    const stockData = {};
    transactions?.forEach(order => {
      let stockName = order.stock.name
      if (!stockData[stockName]) {
        stockData[stockName] = {};
        stockData[stockName].name = stockName;
        stockData[stockName].id = order.id;
        stockData[stockName].shares = order.shares;
        stockData[stockName].value = order.shares * order.price_per_unit;
      } else {
        if (order.type === "buy") {
          stockData[stockName].shares += order.shares;
          stockData[stockName].value += order.shares * order.price_per_unit;
        } else {
          stockData[stockName].shares -= order.shares;
          stockData[stockName].value -= order.shares * order.price_per_unit;
        }
      }
    })
    return stockData;
  }
