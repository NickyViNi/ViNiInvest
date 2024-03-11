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
        <div>
            { watchlistObj?.watchlist_stocks?.map(s => <div>{s.stock.name} ${s.stock.newest_price.close_price}</div> )}
        </div>
    )
}

export default WatchlistDetails;
