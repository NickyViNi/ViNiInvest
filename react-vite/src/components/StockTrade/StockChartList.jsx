import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStocksThunk } from "../../redux/stocks";
import StockTile from "./StockTile";
import Loading from "../Loading";
import "./StockTrade.css";
import { setNavbarBackgroundToWhite } from "../../utils/navbar";
import { Navigate } from "react-router-dom";


function StockChartList() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const allStocks = useSelector(state => state.stocks.allStocks);
  const stocks = Object.values(allStocks);
  const [searchInput, setSearchInput] = useState("");
  const [currentStocks, setCurrentStocks] = useState(Object.values(allStocks));

  const user = useSelector(state => state.session.user);
  if (!user) {
    alert("Please Log in");
    return <Navigate to='/' replace={true} />;
  }

  useEffect( () => {
    const getStocks = async () => {
      const data = await dispatch(getStocksThunk());
      setCurrentStocks(Object.values(data));
      setIsLoaded(true)
    }
    getStocks();
  }, [dispatch])

  useEffect(setNavbarBackgroundToWhite, []);

  const handleSearch = (e) => {
      setSearchInput(e.target.value)
      if (e.target.value === "") {
        setCurrentStocks([...stocks]);
      } else {
        const filterStocks = stocks.filter(stock => stock.name.toLowerCase().includes(e.target.value.toLowerCase()) || stock.symbol.toLowerCase().includes(e.target.value.toLowerCase()));
        setCurrentStocks(filterStocks);
      }
  }

  if (!isLoaded) return <div style={{marginTop:"100px"}}><Loading /></div>

  return (
    <div className="stock-chart-list-container">
      <div id="stock-search-bar">
        <label>Search a Stock:</label>
        <div id="stock-search-input">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Enter name or symbol"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div id="stocks-list-container">
        {currentStocks.map(stock => {
          return <StockTile key={stock.id} stock={stock} />
        })}
      </div>
    </div>
  );
}


export default StockChartList;
