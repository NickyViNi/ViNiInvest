import { useState } from "react";
import { addStockToWatchlistThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function showAddToWatchlistModal({watchlistArr, stockId, stockName}) {
    const [watchlistId, setWatchlistId] = useState();
    const [error, setError] = useState();
    const { setModalContent } = useModal();
    const dispatch = useDispatch();

    const handleAddToWatchlist = async () => {

        if (!watchlistId) return setError({"watchlist": "Please select a watchlist to proceed"});

        const data = await dispatch(addStockToWatchlistThunk(watchlistId, stockId));

        if (data?.errors) {
            return setError(data.errors)
        }

        setModalContent(
                <h2 className="success-alert">Successfully added stock to watchlist</h2>
        );

    }

    return (
        <div className="add-stock-to-a-watchlist-container">
        <h2>Add {stockName} to Watchlist</h2>
        <select value={watchlistId} onChange={e => setWatchlistId(+e.target.value)}>
          <option value="">--Please choose a Watchlist--</option>
          { watchlistArr.map(w => <option key={w.id} value={w.id}>{ w.name }</option>)}
        </select>
        { error?.watchlist && <p className="modal-errors">{error?.watchlist}</p>}
        { error?.message && <p className="modal-errors">{error?.message}</p>}
        <button onClick={ handleAddToWatchlist } >
            Add
        </button>
      </div>
    );
}

export default showAddToWatchlistModal;
