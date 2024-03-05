import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStocksThunk } from "../../redux/stocks";
import StockTile from "./StockTile";


function StockChartList() {
  const dispatch = useDispatch();
  const allStocks = useSelector(state => state.stocks.allStocks);
  const stocks = Object.values(allStocks);

  useEffect( () => {
    dispatch(getStocksThunk());
  }, [dispatch])

  return (
    <div id="stocks-list-container">
      <h2 style={{marginTop:"100px"}}>Stocks Details</h2>
      {stocks.map(stock => {
        return <StockTile key={stock.id} stock={stock} />
      })}
    </div>
  );
}


export default StockChartList;
