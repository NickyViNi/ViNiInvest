import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createWatchlistThunk } from "../../redux/watchlist";

function CreateNewWatchlist () {

    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [errors, setErrors] = useState();
    const { setModalContent, closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(createWatchlistThunk({name}));

        if (data?.errors) return setErrors(data.errors);

        setModalContent(
            <h2 className="success-alert">{`Successfully Created ${name} Watchlist`}</h2>
        )
    }


    return (
        <div className="create-new-watchlist-container">
            <h2>Create a New Watchlist</h2>
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
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateNewWatchlist;
