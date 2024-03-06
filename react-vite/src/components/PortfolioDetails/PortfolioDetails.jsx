import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { deletePortfolioThunk, getPortfolioByIdThunk, getPortfoliosThunk } from "../../redux/portfolio";
import "./PortfolioDetails.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { stockDataCalculate } from "../../helpers/portfolioStockDataCalculate";
import { generateRandomColors } from "../../helpers/generateRandomColors";
import { useModal } from "../../context/Modal";
import CreateNewPortfolio from "./CreateNewPortfolio";
import OpenModalButton from "../OpenModalButton";
import UpdatePortfolio from "./UpdatePortfolio";
import ConfirmDeleteFormModal from "../ConfirmDeleteFormModal.jsx/ConfirmDeleteFormModal";
import convertDateTime from "../../helpers/convertDateTime";
import Loading from "../Loading";

ChartJS.register(ArcElement, Tooltip, Legend);


const PortfolioDetails = () => {
  const dispatch = useDispatch();
  const [portfolioId, setPortfolioId] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  // const navigate = useNavigate();
  const { setModalContent, closeModal } = useModal();
  const user = useSelector(state => state.session.user);

  const allPortfolioObj = useSelector(state => state.portfolios.allPortfolios);
  const portfolios = Object.values(allPortfolioObj);

  const currentPortfolio = useSelector(state => state.portfolios.currentPortfolio);
  const portfolioTransactions = currentPortfolio.transactions;
  const portfolioStocksArray = currentPortfolio.portfolio_stocks;


  if (!user) {
    alert("Please Log in");
    return <Navigate to='/' replace={true} />;
  }

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getPortfoliosThunk());
      if (portfolioId) await dispatch(getPortfolioByIdThunk(portfolioId));
      setIsLoaded(true)
    }
    getData();
  }, [dispatch, portfolioId])


  let currentStockDataObj = {}
  if (portfolioStocksArray) {
    currentStockDataObj = stockDataCalculate(portfolioStocksArray);
  }
  const currentStockData = Object.values(currentStockDataObj);


  const chartData = {
    labels: Object.keys(currentStockDataObj),
    datasets: [
      {
        data: currentStockData,
        backgroundColor: generateRandomColors(currentStockData.length, 150),
        hoverBackgroundColor: generateRandomColors(currentStockData.length, 150),
      },
    ],
  };

  const clearPortfolioStocks = async (_e, portfolioId, portfolioName) => {
    const data = await dispatch(deletePortfolioThunk(portfolioId));
    if (data?.errors) {
      return data.errors;
    }
    setModalContent(<h2 className="success-alert">{`Successfully Sold all Stocks in ${portfolioName} Portfolio`}</h2>)
  }


  if (!isLoaded) return <div style={{marginTop:"100px"}}><Loading /></div>

  return (
    <div className="portfolio-details-container">
      <div className="portfolios-list-create">
        <div className="portfolios-list-container">
          <label htmlFor="portfolio-select">Choose a Portfolio: </label>
          <select name="portfolios" value={portfolioId} onChange={e => setPortfolioId(e.target.value)}>
            <option value="">--Please choose a Portfolio--</option>
            {portfolios.map(p => <option key={p.id} value={p.id}> {p.name} </option>)}
          </select>
        </div>
        <div>
          <button className="create-new-portfolio-btn" onClick={() => setModalContent(<CreateNewPortfolio />)}>Create a New Portfolio</button>
        </div>
      </div>
      {currentPortfolio.name && <div className="portfolio-managment">
        <label>{currentPortfolio.name} Money Balance: ${(currentPortfolio.fake_money_balance).toFixed(2)}</label>
        <div className="update-icon">
          <OpenModalButton
            buttonText={<i className="fa-solid fa-gear" title="Update"></i>}
            modalComponent={<UpdatePortfolio portfolioName={currentPortfolio?.name} portfolioId={currentPortfolio?.id} />}
          />
        </div>
        <div className="clear-portfolio">
          { currentStockData[0] > 0 ? <OpenModalButton
            buttonText={<i className="fa-solid fa-trash-can" title="Delete: Sell All"></i>}
            modalComponent={
              <ConfirmDeleteFormModal
                text="Are you sure you want to sell all the stocks in this portfolio?"
                deleteCb={(e) => clearPortfolioStocks(e, currentPortfolio.id, currentPortfolio.name)}
                cancelDeleteCb={closeModal}
              />
            }
          /> : <i className="fa-solid fa-ban" title="No Stocks to Sell"></i>}

        </div>
      </div> }
      <div className="current-portfolio-detals">
        { currentStockData.length > 0 && <div className="portfolio-pie-chart">
          <Pie data={chartData} />
        </div>}
        { currentStockData.length > 0 && <table className="portfolio-stocks">
            <thead>
              <tr>
                <th scope="col" className="table-header" colSpan={3} >Stocks</th>
              </tr>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Shares</th>
              <th scope="col">Value</th>
            </tr>
            </thead>
            <tbody>
              {portfolioStocksArray.length > 0 &&
               portfolioStocksArray.map(c => <tr key={c.id}>
                <th scope="row">{c.stock?.name}</th>
                <td>{c.quantity}</td>
                <td>{(c.quantity * c.stock?.newest_price.close_price).toFixed(2)}</td>
                </tr>)
              }
            </tbody>
          </table> }
        </div>


        <div className="transactions-table"> { portfolioTransactions?.length > 0 && <table className="portfolio-transactions">
          <thead>
            <tr>
              <th scope="col" className="table-header" colSpan={5}>Transactions</th>
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
              currentPortfolio?.transactions?.sort((a, b) =>b.id - a.id).map(c => <tr key={c?.id}>
                <th scope="row">{c.stock.name}</th>
                <td>{c.shares}</td>
                <td>{c.type}</td>
                <td>{c.price_per_unit}</td>
                <td>{convertDateTime(c.created_at)}</td>
              </tr>)
            }
          </tbody>
        </table> }
      </div>
    </div>
  )
}


export default PortfolioDetails;
