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
        { watchlistArray.map(w => {
          return (
            <div>
              <div>{ w.name }</div>
              <button onClick={() => setWatchlistId()}>
                <i class="fa-solid fa-angle-up"></i>
              </button>
              <button onClick={() => setWatchlistId(w.id)}>
                <i class="fa-solid fa-angle-down"></i>
              </button>
              { watchlistId && watchlistId === w.id && <WatchlistDetails watchlistId={watchlistId} />}
            </div>
          )
        } )}
      </div>
    )
}

export default LoadingWatchlist;