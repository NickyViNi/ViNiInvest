import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnalysisThunk, editAnalysisThunk } from "../../redux/stocks";
import { useModal } from "../../context/Modal";
import "./Analysis.css";

function AnalysisForm ( { stockId, analysis } ) {


    const dispatch = useDispatch();
    const {setModalContent} = useModal();

    const [content, setContent] = useState(analysis?.content || "");
    const [recommendation, setRecommendation] = useState(analysis?.recommendation || "");
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recommendation.length) return setErrors({"recommendation": "You must select a recommendation!"})
        if (content.length < 50) return setErrors({"content": "Content must be at least 50 characters!"})

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
      <div className="create-analysis-form-container">
        {analysis ? <h2>Update Analysis</h2> : <h2>Create Analysis</h2>}
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form onSubmit={handleSubmit} className="create-analysis-form">

            <label>Content</label>
            <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            {errors.content && <p className="content-errors">{errors.content}</p>}

            <label>Recommendation</label>
            <select value={recommendation} onChange={e => setRecommendation(e.target.value)}>
                <option value="" disabled>Select a recommendation</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
                <option value="Hold">Hold</option>
            </select>
            {errors.recommendation && <p className="recommendation-errors">{errors.recommendation}</p>}

            <button type="submit" className="handle-submit-btn">Submit</button>

        </form>
      </div>
    );
}

export default AnalysisForm;
