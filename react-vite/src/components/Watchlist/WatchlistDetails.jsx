import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlistByIdThunk } from "../../redux/watchlist";
import { useNavigate } from "react-router-dom";

function WatchlistDetails ({watchlistId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
              <div key={s?.id} className="watchlist-details"
                title="Click to View Details"
                onClick={() => navigate(`/stocks/${s?.id}`)}
                style={{cursor:"pointer"}}
              >
                <span>{s?.stock.name}</span>
                <span>${s?.stock.newest_price.close_price}</span>
              </div>
            ))}
        </>
    )
}

export default WatchlistDetails;
