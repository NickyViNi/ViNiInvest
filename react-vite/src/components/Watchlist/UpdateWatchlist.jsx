import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { updateWatchlistThunk } from "../../redux/watchlist";

function UpdateWatchlist ({watchlistId, watchlistName}) {

    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();
    const [name, setName] = useState(watchlistName);
    const [errors, setErrors] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(updateWatchlistThunk(watchlistId, {name}));

        if (data?.errors) return setErrors(data.errors);

        setModalContent(
            <h2 className="success-alert">{`Successfully Created ${name} Watchlist`}</h2>
        )
    }


    return (
        <div className="create-new-watchlist-container">
            <h2>Update a New Watchlist</h2>
            <form onSubmit={handleSubmit} className="create-new-watchlist-form">
                <label>Watchlist Name</label>
                <input
                    type="text"
                    spellCheck={false}
                    placeholder="At least 4 characters"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {errors && <p className="modal-errors">{errors.name}</p>}
                <button type="submit" className="handle-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UpdateWatchlist;
