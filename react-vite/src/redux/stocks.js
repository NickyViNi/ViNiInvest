// (1) Action Type
const GET_STOCKS = "stocks/getStocks";
const GET_STOCK_BY_ID = "stocks/getStockById";
const RESET_STOCKS = "stocks/resetStocks";
const DELETE_ANALYSIS = "stocks/deleteAnalysis";
const CREATE_ANALYSIS = "stocks/createAnalysis";
// const EDIT_


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
        case RESET_STOCKS: {
            return {...state,  allStocks: {}, currentStock: {} }
        }
        default:
            return state;
    }
}

export default stockReducer;
