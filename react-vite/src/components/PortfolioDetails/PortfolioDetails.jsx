import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfoliosThunk } from "../../redux/portfolio";


const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const [portfolioName, setPortfolioName] = useState();
  const allPortfolioObj = useSelector(state => state.portfolios.allPortfolios);
  const portfolios = Object.values(allPortfolioObj);
  // const currentPortfolio = useSelector(state => state.currentPortfolio);
  useEffect(() => {
    dispatch(getPortfoliosThunk())
  }, [dispatch])
  return (
    <div style={{marginTop:"100px"}} className="portfolio-details-container">
      <div className="portfolios-list-container">
        <label htmlFor="portfolio-select">Choose a Portfolio:</label>
        <select name="portfolios" value={portfolioName} onChange={e => setPortfolioName(e.target.value)}>
          {portfolios.map(p => <option key={p.id} value={p.name}> {p.name} </option>)}
        </select>
      </div>
      </div>
  )
}


export default PortfolioDetails;
