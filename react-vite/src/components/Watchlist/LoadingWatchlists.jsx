import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteWatchlistThunk, getWatchlistsThunk } from "../../redux/watchlist";
import WatchlistDetails from "./WatchlistDetails";
import { useModal } from "../../context/Modal";
import CreateNewWatchlist from "./CreateNewWatchlist";
import "./Watchlist.css"
import OpenModalButton from "../OpenModalButton";
import ConfirmFormModal from "../ConfirmFormModal.jsx/ConfirmFormModal";
import { deletePortfolioThunk } from "../../redux/portfolio";
import UpdateWatchlist from "./UpdateWatchlist";

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

    const deleteWatchlist = async (_e, deleteWatchlistId, watchlistName) => {
      const data = await dispatch(deleteWatchlistThunk(deleteWatchlistId));

      if (data?.errors) {
        return data.errors;
      }
      setModalContent(<h2 className="success-alert">{`Successfully Delete ${watchlistName} Watchlist`}</h2>)
    }

    return (
      <div className="all-watchlists">
        <div className="watchlist-header">
          <p>My Watchlists: </p>
          <i title="Create a New Watchlist"
            className="fa-solid fa-plus"
            style={{cursor:"pointer"}}
            onClick={() => setModalContent(<CreateNewWatchlist />)}>
          </i>
        </div>
        { watchlistArray.map(w => {
          return (
            <div className="watchlist" key={w?.id}>
              <div className="watchlist-name">
                <div>{ w?.name }</div>
                <div className="watchlist-icons">
                  <div className="update-watchlist">
                    <OpenModalButton
                      buttonText={<i className="fa-solid fa-pen-to-square" title="Update"></i>}
                      modalComponent={
                        <UpdateWatchlist watchlistId={w?.id} watchlistName={w?.name} stocksArr={w.watchlist_stocks}/>
                      }
                    />
                  </div>
                  <div className="delete-watchlist">
                    <OpenModalButton
                      buttonText={<i className="fa-solid fa-trash" title="Delete"></i>}
                      modalComponent={
                        <ConfirmFormModal
                          header="Confirm Delete Watchlist"
                          text="Are you sure you want to delete this watchlist?"
                          deleteCb={(e) => deleteWatchlist(e, w?.id, w?.name)}
                          cancelDeleteCb={closeModal}
                        />
                      }
                    />
                  </div>
                  { watchlistId && watchlistId === w.id ? (
                    <i className="fa-solid fa-angle-down" onClick={() => setWatchlistId()} ></i>
                  ) : (
                    <i className="fa-solid fa-angle-up" onClick={() => setWatchlistId(w.id)} ></i>
                  )}
              </div>
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
