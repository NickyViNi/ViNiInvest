import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlistByIdThunk } from "../../redux/watchlist";

function WatchlistDetails ({watchlistId}) {
    const dispatch = useDispatch();
    const watchlistObj = useSelector(state => state.watchlists.currentWatchlist)

    useEffect(() => {
        const getData = async () => {
          if (watchlistId) await dispatch(getWatchlistByIdThunk(watchlistId));
        }
        getData();
      }, [dispatch, watchlistId])

    return (
        <>
            { watchlistObj?.watchlist_stocks?.map(s => (
              <div className="watchlist-details">
                <span>{s.stock.name}</span>
                <span>${s.stock.newest_price.close_price}</span>
              </div>
            ))}
        </>
    )
}

export default WatchlistDetails;
