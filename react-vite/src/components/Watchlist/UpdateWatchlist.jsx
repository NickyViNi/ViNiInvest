import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { deleteStockInWatchlistThunk, updateWatchlistThunk } from "../../redux/watchlist";

function UpdateWatchlist ({watchlistId, watchlistName, stocksArr}) {

    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();
    const [name, setName] = useState(watchlistName);
    const [errors, setErrors] = useState();
    const [stocksToRemove, setStocksToRemove] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(updateWatchlistThunk(watchlistId, {name}));
        const stockIdsToRemoveArr = Object.values(stocksToRemove);

        // console.log(stockIdsToRemoveArr)
        for (let i = 0; i < stockIdsToRemoveArr.length; i++) {
            const stockId = stockIdsToRemoveArr[i];
           await dispatch(deleteStockInWatchlistThunk(watchlistId, stockId));
        }

        if (data?.errors) return setErrors(data.errors);

        setModalContent(
            <h2 className="success-alert">{`Successfully Updated ${name} Watchlist`}</h2>
        )
    }

    return (
        <div className="update-watchlist-container">
            <h2>Update a Watchlist</h2>
            <form onSubmit={handleSubmit} className="create-new-watchlist-form">
                <label>Watchlist Name:</label>
                <input
                    type="text"
                    spellCheck={false}
                    placeholder="At least 4 characters"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {errors && <p className="modal-errors">{errors.name}</p>}
                    <h4>Stocks List:</h4>
                <div className="remove-stock-from-watchlist">
                    {stocksArr?.map(s => <div className="remove-stock-from-watchlist-map" id={s.stock_id} key={s.stock_id}>
                    <span>{s?.stock?.name}</span>
                    {/* <button onClick={() => removeStockFromWatchlist(e, s.stock_id)}>Remove</button> */}
                    <button onClick={e => {
                        e.preventDefault();
                        if (stocksToRemove[s.stock_id]) {
                            // e.target.textContent = "Cancel";
                            setStocksToRemove(prev => {
                                const newState = {...prev};
                                delete newState[s.stock_id];
                                return newState;
                            })
                        } else {
                            // e.target.textContent = "Remove";
                            setStocksToRemove(prev => {
                                const newState = {...prev};
                                newState[s.stock_id] = s.stock_id;
                                return newState;
                            })
                        }
                    }}>{ stocksToRemove[s.stock_id] ? "Cancel" : "Remove" }</button>
                    </div>)}
                </div>
                <button type="submit" className="handle-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UpdateWatchlist;
