import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWatchlistByIdThunk, getWatchlistsThunk } from "../../redux/watchlist";
import WatchlistDetails from "./WatchlistDetails";

function LoadingWatchlist () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [watchlistId, setWatchlistId] = useState();
    const allWatchlists = useSelector(state => state.watchlists.allWatchlists);
    const watchlistArray = Object.values(allWatchlists);

    useEffect(() => {
      const getData = async () => {
        await dispatch(getWatchlistsThunk());
        if (watchlistId) await dispatch(getWatchlistByIdThunk(watchlistId));
      }
      getData();
    }, [dispatch, watchlistId])


    return (
      <div className="all-watchlists">
        <h3>My Watchlists: </h3>
        { watchlistArray.map(w => {
          return (
            <div className="watchlist">
              <div className="watchlist-name">
                <div>{ w.name }</div>
                { watchlistId === w.id ? (
                  <button onClick={() => setWatchlistId()}>
                    <i class="fa-solid fa-angle-down"></i>
                  </button>
                ) : (
                  <button onClick={() => setWatchlistId(w.id)}>
                    <i class="fa-solid fa-angle-up"></i>
                  </button>
                )}
              </div>
              <div className="watchlist-body">
                { watchlistId && watchlistId === w.id && <WatchlistDetails watchlistId={watchlistId} />}
              </div>
            </div>
          )
        } )}
      </div>
    )
}

export default LoadingWatchlist;
