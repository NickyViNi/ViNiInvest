import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStockByIdThunk } from "../../redux/stocks";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import convertDate from '../../helpers/convertDate';
import convertDateTime from "../../helpers/convertDateTime";
import { getPortfoliosThunk } from "../../redux/portfolio";
import { confirmTransactionThunk, deleteTransactionThunk, postTransactionThunk } from "../../redux/transaction";
import { useModal } from "../../context/Modal";
import UpdateTransactionForm from "../UpdateTransactionForm/UpdateTransactionForm";
import { setNavbarBackgroundToWhite } from "../../utils/navbar";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function StockDetails () {
  const dispatch = useDispatch();
  const { stockId } = useParams();
  const [portfolioId, setPortfolioId] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shares, setShares] = useState();
  const [type, setType] = useState();
  const [errors, setErrors] = useState();
  const currentStock = useSelector(state => state.stocks.currentStock);
  const allPortfolioObj = useSelector(state => state.portfolios.allPortfolios);
  const portfolios = Object.values(allPortfolioObj);
  const {setModalContent} =useModal();

  let selectedPortfolio = {};

  useEffect(setNavbarBackgroundToWhite, []);

  if (portfolioId) {
    selectedPortfolio = allPortfolioObj[portfolioId];
  }

  useEffect(() => {
    const getData = async () => {
      await dispatch(getPortfoliosThunk());
      await dispatch(getStockByIdThunk(stockId));
      setIsLoaded(true);
    }
    getData();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!portfolioId.length) return setErrors({"portfolio": "Please select a portfolio to proceed"})

    const payload = {
      portfolio_id: portfolioId,
      stock_id: stockId,
      shares: shares,
      type: type
    }
    const data = await dispatch(postTransactionThunk(payload, portfolioId, stockId));
    if (data?.errors && data.errors.message) return setModalContent(data.errors.message);
    if (data?.errors) setErrors(data.errors);
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${currentStock.name} (${currentStock.symbol})`,
      },
    },
  };

  const labels = currentStock.prices?.sort((a, b) => b.id - a.id).map(p => convertDate(p.date))
    const data = {
      labels,
      datasets: [
        {
          label: 'Open Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.open_price),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Close Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.close_price),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'high Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.high_price),
          borderColor: 'pink',
          backgroundColor: 'pink',
        },
        {
          label: 'low Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.low_price),
          borderColor: 'rgb(211, 211, 211)',
          backgroundColor: 'rgb(211, 211, 211)',
        },
      ],
    };

    const updateTransaction = async (e,t) => {
      // await dispatch(updateTransactionThunk());
      setModalContent(
        <UpdateTransactionForm portfolios={portfolios} transaction={t} allPortfolioObj={allPortfolioObj} currentStock={currentStock} />
      )
    }

    const deleteTransaction = async (e, transactionId) => {
      await dispatch(deleteTransactionThunk(transactionId));
      setModalContent(<h2>Successfully deleted</h2>)
    }

    const confirmTransaction = async (e, transactionId) => {
      await dispatch(confirmTransactionThunk(transactionId));
    }

  if (!isLoaded) return <div style={{marginTop:"100px"}}><Loading /></div>

  return (
    <div className="stock-detail-container">
      <h2 style={{marginTop:"100px"}}></h2>
      <div id="current-stock-line">
          <Line options={options} data={data} />
      </div>
      <div id="trade-data-contaner">
      <div id="place-order-container">
          <div className="buy-sell-btns">
            <div className="green" onClick={e => {
              setType("buy");
              const sell = document.querySelector(".red");
              if (sell) sell.style.backgroundColor = "white";
              e.target.style.backgroundColor = "pink";
            }}>Buy</div>
            <div className="separator"></div>
            <div className="red" onClick={e => {
              setType("sell");
              const buy = document.querySelector(".green");
              if (buy) buy.style.backgroundColor = "white";
              e.target.style.backgroundColor = "pink";
            }}>Sell</div>
            {errors && errors.type}
          </div>
          <div className="amount">
            <label>Shares</label>
            <input type="number"
              value={shares}
              onChange={e => setShares(e.target.value)}
            />
            {errors && errors.shares}
          </div>
          <div className="amount">
            <label>Price Per Share</label>
            <input type="number"
              disabled
              placeholder={`$${currentStock.prices[0].close_price}`}
            />
          </div>
          <div className="amount">
            <label>Select a Portfolio</label>
            <select name="portfolios" value={portfolioId} onChange={e => setPortfolioId(e.target.value)}>
              <option value="">--Please choose a Portfolio--</option>
              {portfolios.map(p => <option key={p.id} value={p.id}> {p.name} </option>)}
            </select>
          </div>
          {errors && errors.portfolio}
          <button onClick={handleSubmit}>Place Oder</button>
          <div id="money-balance">${selectedPortfolio?.fake_money_balance?.toFixed(2)} buying power</div>
      </div>

      <table id="stock-value-data">
        <tbody>
          <th>Your Market Value</th>
          <td>$1000</td>
        </tbody>
        <tbody>
          <th>Your Average Cost</th>
          <td>$100</td>
        </tbody>
        <tbody>
          <th>Shares</th>
          <td>100</td>
        </tbody>
        <tbody>
          <th>Total Return</th>
          <td>1000</td>
        </tbody>
      </table>

      <table id="stock-key-data">
      <thead>
          <tr>
            <th scope="col" className="table-header" colSpan={2}>{currentStock.name} {convertDate(currentStock.newest_price.date)} </th>
          </tr>
        </thead>
        <tbody>
          <th>Open Price</th>
          <td>${currentStock.newest_price.open_price}</td>
        </tbody>
        <tbody>
          <th>High Price</th>
          <td>${currentStock.newest_price.high_price}</td>
        </tbody>
        <tbody>
          <th>Low Price</th>
          <td>${currentStock.newest_price.low_price}</td>
        </tbody>
        <tbody>
          <th>Close Price</th>
          <td>${currentStock.newest_price.close_price}</td>
        </tbody>
      </table>
      </div>

      { currentStock?.transactions?.length > 0 &&
      <table id="current-stock-transaction-table">
        <thead>
          <tr>
            <th scope="col" className="table-header" colSpan={6}>{currentStock.name} Transactions</th>
          </tr>
          <tr>
            <th scope="col">Portfolio</th>
            <th scope="col">Shares</th>
            <th scope="col">Type</th>
            <th scope="col">Price Per Unit</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
            {currentStock &&
              currentStock?.transactions?.sort((a, b) =>b.id - a.id).map(t => <tr key={t.id}>
                <th scope="row">{t.portfolio.name}</th>
                <td>{t.shares}</td>
                <td>{t.type}</td>
                <td>{t.price_per_unit}</td>
                <td>{convertDateTime(t.created_at)}</td>
                <td>{t.is_completed ? "Completed" : "Pending"}</td>
                <td onClick={e => updateTransaction(e, t)}>{t.is_completed ? "" : "Update"}</td>
                <td onClick={e => deleteTransaction(e, t.id)}>{t.is_completed ? "" : "Delete"}</td>
                <td onClick={e => confirmTransaction(e, t.id)}>{t.is_completed ? "" : "Confirm"}</td>
              </tr>)
            }
          </tbody>
      </table> }
    </div>
  )
}

export default StockDetails;
