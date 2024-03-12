import { useState } from "react";
import { addStockToWatchlistThunk } from "../../redux/watchlist";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

function showAddToWatchlistModal({watchlistArr, stockId}) {
    const [watchlistId, setWatchlistId] = useState(-1);
    const { setModalContent } = useModal();
    const dispatch = useDispatch();

    const handleAddToWatchlist = async () => {
        console.log(watchlistId);
        const data = await dispatch(addStockToWatchlistThunk(watchlistId, stockId));
        console.log(data);
        if (data?.errors) {
            setModalContent(
                <h2>{data.errors.message}</h2>
            )
        } else {
            setModalContent(
                <h2>Successfully added stock to watchlist</h2>
            );
        }
    }

    return (
        <>
        <h2>Add Stock to Watchlist</h2>
        <select value={watchlistId} onChange={e => setWatchlistId(+e.target.value)}>
          <option value="">--Please choose a Watchlist--</option>
          { watchlistArr.map(w => <option key={w.id} value={w.id}>{ w.name }</option>)}
        </select>
        <button onClick={ handleAddToWatchlist }>
            Add
        </button>
      </>
    );
}

export default showAddToWatchlistModal;
