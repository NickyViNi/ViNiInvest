import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getWatchlistByIdThunk, getWatchlistsThunk } from "../../redux/watchlist";
import WatchlistDetails from "./WatchlistDetails";
import { useModal } from "../../context/Modal";
import CreateNewWatchlist from "./CreateNewWatchlist";
import "./Watchlist.css"

function LoadingWatchlist () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [watchlistId, setWatchlistId] = useState();
    const { setModalContent, closeModal } = useModal();
    const allWatchlists = useSelector(state => state.watchlists.allWatchlists);
    const watchlistArray = Object.values(allWatchlists);

    useEffect(() => {
      const getData = async () => {
        await dispatch(getWatchlistsThunk());
      }
      getData();
    }, [dispatch])


    return (
      <div className="all-watchlists">
        <div className="watchlist-header">
          <p>My Watchlists: </p>
          <i title="Create a New Watchlist"
            class="fa-solid fa-plus"
            style={{cursor:"pointer"}}
            onClick={() => setModalContent(<CreateNewWatchlist />)}>
          </i>
        </div>
        { watchlistArray.map(w => {
          return (
            <div className="watchlist">
              <div className="watchlist-name">
                <div>{ w.name }</div>
                { watchlistId === w.id ? (
                  <i class="fa-solid fa-angle-down" onClick={() => setWatchlistId()} ></i>
                ) : (
                  <i class="fa-solid fa-angle-up" onClick={() => setWatchlistId(w.id)} ></i>
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
