// (1) Action Type
const GET_STOCKS = "stocks/getStocks";
const GET_STOCK_BY_ID = "stocks/getStockById";
const RESET_STOCKS = "stocks/resetStocks";
const DELETE_ANALYSIS = "stocks/deleteAnalysis";
const CREATE_ANALYSIS = "stocks/createAnalysis";
const EDIT_ANALYSIS = "stocks/editAnalysis";


// (2) Action Creator
export const getStocksAction = (stocks) => {
    return {
        type: GET_STOCKS,
        stocks
    }
}

export const getStockByIdAction = (stock) => {
    return {
        type: GET_STOCK_BY_ID,
        stock
    }
}

export const resetStocksAction = () => {
    return {
        type: RESET_STOCKS
    }
}

export const deleteAnalysisAction = (stockId, analysisId) => {
    return {
        type: DELETE_ANALYSIS,
        stockId,
        analysisId
    }
}

export const createAnalysisAction = (analysis) => {
    return {
        type: CREATE_ANALYSIS,
        analysis
    }
}

export const editAnalysisAction = (analysis) => {
    return {
        type: EDIT_ANALYSIS,
        analysis
    }
}


// (3) Thunk
export const getStocksThunk = () => async (dispatch) => {
    const res = await fetch("/api/stocks/");
    const data = await res.json();

    if (!res.ok) {
        return {errors: data.errors}
    }

    dispatch(getStocksAction(data));
    return data;
}

export const getStockByIdThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${id}`);
    const data = await res.json();

    if (!res.ok) {
        return {errors: data}
    }

    dispatch(getStockByIdAction(data));
    // return data;
}

export const deleteAnalysisThunk = (analysisId, stockId) => async (dispatch) => {
    const res = await fetch(`/api/analyses/${analysisId}`, {
        method: 'DELETE'
    })
    const data = await res.json();
    if (!res.ok) {
        return {errors: data}
    }
    dispatch(deleteAnalysisAction(stockId, analysisId));
}

export const createAnalysisThunk = (stockId, payload) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${stockId}/analysis`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(createAnalysisAction(data));
}

export const editAnalysisThunk = (analysisId, payload) => async (dispatch) => {
    const res = await fetch(`/api/analyses/${analysisId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(editAnalysisAction(data));
}

// (4) Reducer
const initialState = { allStocks: {}, currentStock: {} }
const stockReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_STOCKS: {
            const allStocks = {};
            action.stocks.forEach(s => allStocks[s.id] = s);
            return {...state, allStocks: allStocks};
        }
        case GET_STOCK_BY_ID: {
            return {
                ...state,
                currentStock: action.stock
            }
        }
        case DELETE_ANALYSIS: {
            const newState = {...state};
            const analyses = newState.currentStock.stock_analyses;
            newState.currentStock.stock_analyses = analyses.filter(analysis => analysis.id !== action.analysisId);
            return newState;
        }
        case CREATE_ANALYSIS: {
            const newState = {...state};
            if (newState.currentStock.stock_analyses.find(analysis => analysis.id !== action.analysis.id)) {
                newState.currentStock.stock_analyses.push(action.analysis);
            }
            return newState;
        }
        case EDIT_ANALYSIS: {
            const newState = {...state};
            const analyses = newState.currentStock.stock_analyses;
            for (let i = 0; i < analyses.length; i++) {
                const analysis = analyses[i];
                if (analysis.id === action.analysis.id) {
                    newState.currentStock.stock_analyses = newState.currentStock.stock_analyses.filter(analysis=>analysis.id !== action.analysis.id)
                    newState.currentStock.stock_analyses.unshift(action.analysis);
                    break;
                }
            }
            return newState;
        }
        case RESET_STOCKS: {
            return {...state,  allStocks: {}, currentStock: {} }
        }
        default:
            return state;
    }
}

export default stockReducer;
