import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createPortfolioThunk } from "../../redux/portfolio";
import ShortLoading from "../Loading/shortLoading";

const CreateNewPortfolio = () => {

    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();
    const [name, setName] = useState("");
    const [balance, setBalance] = useState();
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            fake_money_balance: balance
        }
        const data = await dispatch(createPortfolioThunk(payload));
        setIsLoaded(true)

        if(data?.errors) {
            return setError(data.errors);
        }

        setModalContent(
        <>
            <h2 className="success-alert">{`Successfully Created ${name} Portfolio`}</h2>
            <div><ShortLoading /></div>
        </>)

        setTimeout(() => {
            closeModal();
        }, 4000);

    }

    // if(!isLoaded) return <div><ShortLoading /></div>

    return (
        <div className="create-new-portfolio-container">
            <h2>Create a New Portfolio</h2>
            <form onSubmit={handleSubmit} className="create-new-portfolio-form">
                <label>Portfolio Name</label>
                <input
                    type="text"
                    spellCheck={false}
                    placeholder="At least 4 characters"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {error && <p className="modal-errors">{error.name}</p>}
                <label>Fake Money Amount $</label>
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
