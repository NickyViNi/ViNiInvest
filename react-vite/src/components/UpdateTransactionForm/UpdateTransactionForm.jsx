import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTransactionThunk } from "../../redux/transaction";
import { useModal } from "../../context/Modal";
import { getPortfolioByIdThunk, getPortfoliosThunk } from "../../redux/portfolio";

function UpdateTransactionForm({portfolios, transaction, allPortfolioObj, currentStock}) {
    const dispatch = useDispatch();
    const selectedPortfolio = allPortfolioObj[transaction.portfolio_id];
    const [shares, setShares] = useState(transaction.shares || "");
    const [type, setType] = useState(transaction.type|| "");
    const [errors, setErrors] = useState();
    const [portfolioId, setPortfolioId] = useState(transaction.portfolio_id || "");
    const {setModalContent} = useModal();

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            id: transaction.id,
            portfolio_id: transaction.portfolio_id,
            stock_id: transaction.stock_id,
            shares: shares,
            type: type
        }

        const data = await dispatch(updateTransactionThunk(payload));
        if (data?.errors) {
          setErrors(data.errors);
          return data.errors;
        }
        await dispatch(getPortfoliosThunk());
        await dispatch(getPortfolioByIdThunk(transaction.portfolio_id));
        setModalContent(<h2 className="success-alert">{`Successfully Updated!`}</h2>)
    }

    return (<>
        <h2 style={{color: "rgb(255, 132, 0)", textAlign:"center"}}>Update {currentStock?.name} Transaction</h2>
        <div id="place-order-container">
        <div className="buy-sell-btns">
          <div className="green" style={{backgroundColor: type === "buy" ? "pink" : "white", cursor:"not-allowed"}}>Buy</div>
          <div className="separator"></div>
          <div className="red" style={{backgroundColor: type === "sell" ? "pink" : "white", cursor:"not-allowed"}}>Sell</div>
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
              style={{cursor:"not-allowed"}}
            />
          </div>
        <div className="amount">
          <label>Trade Portfolio</label>
          <select style={{cursor:"not-allowed"}} name="portfolios" disabled value={portfolioId}>
            <option value="">--Please choose a Portfolio--</option>
            {portfolios.map(p => <option key={p.id} value={p.id}> {p.name} </option>)}
          </select>
        </div>
        {errors?.portfolio && <p className="modal-errors">{errors.portfolio}</p>}
        {errors?.message && <p className="modal-errors">{errors?.message}</p>}
        <button onClick={handleSubmit}>Update Order</button>
        <div id="money-balance">${selectedPortfolio?.fake_money_balance?.toFixed(2)} Buying Power Available</div>
    </div>
    </>);
}

export default UpdateTransactionForm
