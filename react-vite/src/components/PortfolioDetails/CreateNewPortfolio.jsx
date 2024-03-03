import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createPortfolioThunk } from "../../redux/portfolio";

const CreateNewPortfolio = () => {

    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            fake_money_balance: balance
        }
        const data = await dispatch(createPortfolioThunk(payload));

        if(data?.errors) {
            return setError(data.errors);
        }

        setModalContent(<h2 className="success-alert">{`Successfully Created ${name} Portfolio`}</h2>)
    }

    return (
        <div>
            <h2>Create a New Portfolio</h2>
            <form onSubmit={handleSubmit}>
                <label>Portfolio Name</label>
                <input
                    type="text"
                    spellCheck={false}
                    placeholder="At least 4 characters"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {error && <p className="modal-errors">{error.name}</p>}
                <label>Fake Money Balance</label>
                <input
                    type="number"
                    placeholder="Greater than 0"
                    value={balance}
                    onChange={e => setBalance(e.target.value)}
                />
                {error && <p className="modal-errors">{error.fake_money_balance}</p>}
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateNewPortfolio;
