import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { updatePortfolioThunk } from "../../redux/portfolio";

const UpdatePortfolio = ({portfolioName, portfolioId}) => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const [name, setName] = useState(portfolioName);
    const [money, setMoney] = useState();
    const [errors, setErrors] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            fake_money_balance: money
        }
        const data = await dispatch(updatePortfolioThunk(portfolioId, payload))

        if (data?.errors) {
            return setErrors(data.errors);
        }

        setModalContent(<h2 className="success-alert">{`Successfully Updated ${name} Portfolio`}</h2>)
    }

    if (!portfolioName) return;

    return (
        <div className="create-new-portfolio-container">
            <h2>Update Portfolio</h2>
            <form onSubmit={handleSubmit} className="create-new-portfolio-form">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    spellCheck={false}
                    placeholder="At least 4 characters"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                {errors && <p className="modal-errors">{errors.name}</p>}
                <label>Add More Money $</label>
                <input
                    type="number"
                    placeholder="Greater than 0"
                    value={money}
                    onChange={e => setMoney(e.target.value)}
                />
                {errors && <p className="modal-errors">{errors.fake_money_balance}</p>}
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UpdatePortfolio;
