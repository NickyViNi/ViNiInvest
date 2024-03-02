import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolioByIdThunk, getPortfoliosThunk } from "../../redux/portfolio";


const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const [portfolioId, setPortfolioId] = useState();
  const allPortfolioObj = useSelector(state => state.portfolios.allPortfolios);
  const portfolios = Object.values(allPortfolioObj);
  const currentPortfolio = useSelector(state => state.portfolios.currentPortfolio);
  useEffect(() => {
    dispatch(getPortfoliosThunk());
    dispatch(getPortfolioByIdThunk(portfolioId))
  }, [dispatch, portfolioId])

  console.log("current portfolio id:", portfolioId)
  console.log("current portfolio: ", currentPortfolio)

  return (
    <div style={{marginTop:"100px"}} className="portfolio-details-container">
      <div className="portfolios-list-create">
        <div className="portfolios-list-container">
          <label htmlFor="portfolio-select">Choose a Portfolio:</label>
          <select name="portfolios" value={portfolioId} onChange={e => setPortfolioId(e.target.value)}>
            <option value="">--Please choose a Portfolio--</option>
            {portfolios.map(p => <option key={p.id} value={p.id}> {p.name} </option>)}
          </select>
        </div>
        <div>
          <button>Create a New Portfolio</button>
        </div>
      </div>
      <div className="portfolio-managment">
        <label>Money Balance: ${currentPortfolio.fake_money_balance}</label>
        <button>Update</button>
        <button>Delete</button>
      </div>
      <div className="current-portfolio-detals">
        <div className="portfolio-pie-charts">portfolio pie charts</div>
        <table className="portfolio-stocks">
          <thead>
            <tr>
              <th scope="col">Stocks</th>
            </tr>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Shares</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {currentPortfolio &&
              currentPortfolio?.transactions?.map(c => <tr key={c?.id}>
                <th scope="row">{c.stock.name}</th>
                <td>{c.shares}</td>
                <td>{c.shares * c.price_per_unit}</td>
              </tr>)
            }
          </tbody>
        </table>

        <table className="portfolio-transactions">
          <thead>
            <tr>
              <th scope="col">Transactions</th>
            </tr>
            <tr>
              <th scope="col">Stock Name</th>
              <th scope="col">Shares</th>
              <th scope="col">Type</th>
              <th scope="col">Price Per Unit</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentPortfolio &&
              currentPortfolio?.transactions?.map(c => <tr key={c?.id}>
                <th scope="row">{c.stock.name}</th>
                <td>{c.shares}</td>
                <td>{c.type}</td>
                <td>{c.price_per_unit}</td>
                <td>{c.created_at}</td>
              </tr>)
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}


export default PortfolioDetails;
