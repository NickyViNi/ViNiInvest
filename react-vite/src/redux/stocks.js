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

    dispatch(get(data));
}

export const getStockByIdThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${id}`);
    const data = await res.json();
    if (!res.ok) {
        return {errors: data}
    }

    dispatch(getStockByIdAction(data));
}

// (4) Reducer
