import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTransactionThunk } from "../../redux/transaction";
import { useModal } from "../../context/Modal";

function UpdateTransactionForm({portfolios,transaction,allPortfolioObj}) {
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
        setModalContent(<h2>Successfully updated!</h2>)
        if (data?.errors && data.errors.message) return setModalContent(data.errors.message);
        if (data?.errors) setErrors(data.errors);
    }

    return (<>
        <h2>Update Order</h2>
        <div id="place-order-container">
        <div className="buy-sell-btns">
          <div className="green" style={{backgroundColor: type === "buy" ? "pink" : "white"}}>Buy</div>
          <div className="separator"></div>
          <div className="red" style={{backgroundColor: type === "sell" ? "pink" : "white"}}>Sell</div>
          {errors && errors.type}
        </div>
        <div className="amount">
          <label>Amount</label>
          <input type="number"
            value={shares}
            onChange={e => setShares(e.target.value)}
          />
          {errors && errors.shares}
        </div>
        <div className="amount">
          <label>Select a Portfolio</label>
          <select name="portfolios" disabled value={portfolioId}>
            <option value="">--Please choose a Portfolio--</option>
            {portfolios.map(p => <option key={p.id} value={p.id}> {p.name} </option>)}
          </select>
        </div>
        {errors && errors.portfolio}
        <button onClick={handleSubmit}>Update Oder</button>
        <div id="money-balance">{selectedPortfolio?.fake_money_balance}buying power</div>
    </div>
    </>);
}

export default UpdateTransactionForm
