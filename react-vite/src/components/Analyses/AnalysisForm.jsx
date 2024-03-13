import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAnalysisThunk, editAnalysisThunk } from "../../redux/stocks";
import { useModal } from "../../context/Modal";

function AnalysisForm ( { stockId, userId, analysis } ) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {setModalContent} = useModal();

    const [content, setContent] = useState(analysis?.content || "");
    const [recommendation, setRecommendation] = useState(analysis?.recommendation || "");
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recommendation.length) return setErrors({"recommendation": "You must select a recommendation!"})
        if (content.length < 50) return setErrors({"content": "Content must be at least 50 characters!"})

        e.preventDefault();

        const payload = {
            recommendation,
            content
        }

        let serverResponse;
        if (analysis) {
            serverResponse = await dispatch(
                editAnalysisThunk(analysis.id, payload)
            );
        } else {
            serverResponse = await dispatch(
                createAnalysisThunk(stockId, payload)
            );
        }

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            if (analysis) {
                setModalContent(
                    <h2>Successfully updated analysis!</h2>
                )
            } else {
                setModalContent(
                    <h2>Successfully created analysis!</h2>
                )
            }
        }
    };

    return (
      <>
        <h1>Create Analysis</h1>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Content</label>
                <textarea
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            {errors.content && <p>{errors.content}</p>}
            </div>
            <div>
                <label>Recommendation</label>
                <select value={recommendation} onChange={e => setRecommendation(e.target.value)}>
                    <option value="" disabled>Select a recommendation</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                    <option value="hold">Hold</option>
                </select>
                {errors.recommendation && <p>{errors.recommendation}</p>}
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
      </>
    );
}

export default AnalysisForm;
