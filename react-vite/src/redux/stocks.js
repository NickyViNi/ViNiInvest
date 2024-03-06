// (1) Action Type
const GET_STOCKS = "stocks/getStocks";
const GET_STOCK_BY_ID = "stocks/getStockById";


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
        default:
            return state;
    }
}

export default stockReducer;
