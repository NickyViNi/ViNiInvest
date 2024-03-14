import { Line } from 'react-chartjs-2';
import { useModal } from "../../context/Modal";
import { deleteAnalysisThunk, getStockByIdThunk } from "../../redux/stocks";
import { getWatchlistsThunk } from "../../redux/watchlist";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarBackgroundToWhite } from "../../utils/navbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPortfolioByIdThunk, getPortfoliosThunk } from "../../redux/portfolio";
import {
  confirmTransactionThunk,
  deleteTransactionThunk,
  postTransactionThunk
} from "../../redux/transaction";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Loading from "../Loading";
import OpenModalButton from "../OpenModalButton";
import convertDate from '../../helpers/convertDate';
import convertDateTime from "../../helpers/convertDateTime";
import ConfirmFormModal from "../ConfirmFormModal.jsx/ConfirmFormModal";
import AddToWatchlistModal from "../AddToWatchlistModal/AddToWatchlistModal";
import UpdateTransactionForm from "../UpdateTransactionForm/UpdateTransactionForm";
import AnalysisForm from '../Analyses/AnalysisForm';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function StockDetails () {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { stockId } = useParams();
  const { setModalContent, closeModal } = useModal();

  const [type, setType] = useState();
  const [shares, setShares] = useState();
  const [errors, setErrors] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [portfolioId, setPortfolioId] = useState();
  const [news, setNews] = useState();

  const user = useSelector(state => state.session.user);
  const currentStock = useSelector(state => state.stocks.currentStock);
  const allPortfolioObj = useSelector(state => state.portfolios.allPortfolios);
  const watchlistObj = useSelector(state => state.watchlists.allWatchlists);
  const watchlistArr = Object.values(watchlistObj);
  const portfolios = Object.values(allPortfolioObj);

  const apiKey = 'TsAGVWpULmpxbIgNpbwPP_Lz73wgCQ1H';

  useEffect(setNavbarBackgroundToWhite, []);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getWatchlistsThunk());
      await dispatch(getPortfoliosThunk());
      await dispatch(getStockByIdThunk(stockId));

       // Fetch News for current stock

      const newsRes = await fetch(`https://api.polygon.io/v2/reference/news?ticker=${currentStock.symbol}&apiKey=${apiKey}`)
       .then(response => {
         if (!response.ok) throw new Error(`Failed to fetch news for ${currentStock.symbol}`);
         return response.json();
       })
       .then(data => data.results)
       .catch(error => console.error(`Error fetching news for ${currentStock.symbol}:`, error))

      setNews(newsRes)
      setIsLoaded(true);
    }

    getData();
    // const interval = setInterval(getData, 600000 * 60 * 24); // Refetch data every day
    // return () => clearInterval(interval);

  }, [dispatch, stockId, currentStock.symbol]);


  if (!user) {
    alert("Please Log in");
    return <Navigate to='/' replace={true} />;
  }

  let selectedPortfolio = {};

  if (portfolioId) {
    selectedPortfolio = allPortfolioObj[portfolioId];
  }


  const handleSubmitTransaction = async (e) => {
    e.preventDefault();

    if (!portfolioId) return setErrors({"portfolio": "Please select a portfolio to proceed"})

    const payload = {
      portfolio_id: portfolioId,
      stock_id: stockId,
      shares: shares,
      type: type
    }
    const data = await dispatch(postTransactionThunk(payload, portfolioId, stockId));

    if (data?.errors)  {
      setErrors(data.errors);
    } else {
      await dispatch(getPortfoliosThunk());
      await dispatch(getPortfolioByIdThunk(portfolioId));
      setErrors("");
      setModalContent(<h2 className="success-alert">Successfully submited a transaction, please click &quot;Confirm&quot; button in transaction table to complete this order.</h2>)
    }

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

      setModalContent(
        <UpdateTransactionForm portfolios={portfolios} transaction={t} allPortfolioObj={allPortfolioObj} currentStock={currentStock} />
      )
    }

    const deleteTransaction = async (_e, transactionId, portfolioId) => {
      const data = await dispatch(deleteTransactionThunk(transactionId));
      if (data?.errors) {
        return data.errors;
      }
      await dispatch(getPortfoliosThunk());
      await dispatch(getPortfolioByIdThunk(portfolioId));
      setModalContent(<h2 className="success-alert">Successfully deleted {currentStock?.name} transaction</h2>)
    }

    const confirmTransaction = async (_e, transactionId, portfolioId) => {
      const data = await dispatch(confirmTransactionThunk(transactionId));
      if (data?.errors) {
        return data.errors;
      }
      await dispatch(getPortfoliosThunk());
      await dispatch(getPortfolioByIdThunk(portfolioId));
      setModalContent(<h2 className="success-alert">{currentStock.name} transaction is completed!</h2>)
    }

  const showAddToWatchlistModal = () => {
    setModalContent(
      <AddToWatchlistModal
        watchlistArr={watchlistArr}
        stockId={stockId}
        stockName={currentStock?.name}
      />
    )
  }

  const showAnalysisForm = (sa) => {
    setModalContent(
      <AnalysisForm
        stockId={stockId}
        userId={user.id}
        analysis={sa}
      />
    );
  }


  const deleteAnalysis = async (analysisId) => {
     await dispatch(deleteAnalysisThunk(analysisId, currentStock.id));
  }

  const showConfirmDeleteAnalysis = (analysisId) => {
    setModalContent(
      <ConfirmFormModal
        header={"Confirm Delete Analysis"}
        text={"Are you sure you want to delete this analysis"}
        deleteCb={() => {
          deleteAnalysis(analysisId);
          setModalContent(<h2>Successfully deleted analysis!</h2>)
        }}
        cancelDeleteCb={closeModal}
      />
    )
  }

  const showAnalysisContent = (analysis) => {
    setModalContent(
      <div>{analysis.content}</div>
    )
  }

  if (!isLoaded) return <div style={{marginTop:"100px"}}><Loading /></div>


  return (
    <div className='stock-detail-news-container'>
      <div className="stock-detail-container">
        <div className='stock-shoping-star-icon'>
          <div className="shopping-btn" onClick={() => navigate(`/stocks`)} title="Click here view more stocks" >
              <i className="fa-brands fa-shopify" ></i>
          </div>
          <div className="add-to-watchlist-btn">
            <i className="fa-regular fa-star" onClick={showAddToWatchlistModal} title='Add to Watchlist'></i>
          </div>
        </div>
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
              {errors && <p className="modal-errors">{errors.type}</p>}
            </div>
            <div className="amount">
              <label>Shares</label>
              <input type="number"
                value={shares}
                onChange={e => setShares(e.target.value)}
              />
              {errors && <p className="modal-errors">{errors.shares}</p>}
            </div>
            <div className="amount">
              <label>Price Per Share</label>
              <input type="number"
                disabled
                placeholder={`$${currentStock.newest_price.close_price}`}
              />
            </div>
            <div className="amount">
              <label>Select a Portfolio</label>
              <select name="portfolios" value={portfolioId} onChange={e => setPortfolioId(e.target.value)}>
                <option value="">--Please choose a Portfolio--</option>
                {portfolios.map(p => <option key={p.id} value={p.id}> {p.name} </option>)}
              </select>
            </div>
            {errors?.portfolio && <p className="modal-errors">{errors?.portfolio}</p>}
            {errors?.message && <p className="modal-errors">{errors?.message}</p>}
            <button onClick={handleSubmitTransaction}>Place Order</button>
            <div id="money-balance">${selectedPortfolio?.fake_money_balance?.toFixed(2)} Buying Power Available</div>
        </div>

        {/* <table id="stock-value-data">
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
        </table> */}

        <table id="stock-key-data">
        <thead >
            <tr>
              <th scope="col" className="table-header2" colSpan={2}>{currentStock.name} {convertDate(currentStock.newest_price.date)} </th>
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
                  <th scope="row" onClick={() => navigate("/portfolios")} style={{cursor:"pointer"}} title="Click here go to portfolios">{t.portfolio.name}</th>
                  <td>{t.shares.toFixed(2)}</td>
                  <td>{t.type}</td>
                  <td>{t.price_per_unit}</td>
                  <td>{convertDateTime(t.created_at)}</td>
                  <td>{t.is_completed ? "Completed" : "Pending"}</td>
                  {!t.is_completed && <> <td className="update-transaction-btn" onClick={e => updateTransaction(e, t)}>{t.is_completed ? "" : <button>Update</button>}</td>
                  <td className="delete-transaction-btn">
                    {t.is_completed ? "" :
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={
                        <ConfirmFormModal
                          header="Confirm Delete Transaction"
                          text="Are you sure you want to delete this transaction?"
                          deleteCb={(e) => deleteTransaction(e, t.id, t.portfolio_id)}
                          cancelDeleteCb={closeModal}
                        />
                      }
                    />
                    }
                  </td>
                  <td className="confirm-transaction-btn">{t.is_completed ? "" :
                  <OpenModalButton
                  buttonText="Confirm"
                  modalComponent={
                    <ConfirmFormModal
                      header="Confirm Transaction"
                      text="Click 'Yes' to complete your transaction."
                      deleteCb={(e) => confirmTransaction(e, t.id, t.portfolio_id)}
                      cancelDeleteCb={closeModal}
                    />
                  }
                  />}</td> </>}
                </tr>)
              }
            </tbody>
        </table> }
      </div>
      <div className='news-analysis-container'>
        <div className='news-list-container'>
          <h3 className="news-heading">Latest News About {currentStock?.name}:</h3>
          <ul className="news-list">
            {news?.slice(0, 10).map(article => (
              <li key={article.id} className="news-list-item">
                <div className="news-info">
                  <img src={article.image_url} alt={article.title} />
                  <a href={article.article_url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='analyses-list-container'>
          <h3 className="news-heading">Analyses About {currentStock.name}:</h3>
          {!currentStock.stock_analyses.find(sa => sa.user.id === user.id) && (
            <div className='analysis-create' onClick={()=>showAnalysisForm(null)}>Create new analysis</div>
          )}
          <div className="analyses">
            { currentStock.stock_analyses && currentStock.stock_analyses.map(sa => {
              return (
                <div className='analysis' key={sa.id}>
                  <div className='analysis-user-profile'>
                    <div><img src={sa.user.profile_image_url} alt="avatar" /></div>
                    <div>{ sa.user.username }</div>
                  </div>
                  <div className='analysis-recommendation'>Recommend: { sa.recommendation }</div>
                  <div className='analysis-content'>
                    { sa.content.length >90 ?
                    <>{sa.content.slice(0, 90)} <span onClick={() => showAnalysisContent(sa)}> ... See More</span></> : sa.content }
                  </div>
                  {sa.user.id === user.id && (
                    <div className='analysis-buttons'>
                      <div onClick={() => showAnalysisForm(sa)}><i className="fa-solid fa-pen-to-square" title="Update"></i></div>
                      <div onClick={() => showConfirmDeleteAnalysis(sa.id)}><i className="fa-solid fa-trash" title="Delete"></i></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockDetails;
