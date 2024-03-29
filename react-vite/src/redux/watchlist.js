// (1) action type
const GET_WATCHLISTS = "watchlists/getWatchlists"
const GET_WATCHLIST_BY_ID = "watchlists/getWatchlistById"
const CREATE_WATCHLIST = "watchlists/createWatchlist"
const UPDATE_WATCHLIST = "watchlists/updateWatchlist"
const DELETE_WATCHLIST = "watchlists/deleteWatchlist"
const RESET_WATCHLIST = "watchlists/resetWatchlist"
const DELETE_STOCK_IN_WATCHLIST = "watchlists/deleteStockInWatchlist"
// const ADD_STOCK_TO_WATCHLIST = "watchlists/addStockToWatchlist"


// (2) action
export const getWatchlistsAction = (watchlists) => {
    return {
        type: GET_WATCHLISTS,
        watchlists
    }
}

export const getWatchlistByIdAction = (watchlist) => {
    return {
        type: GET_WATCHLIST_BY_ID,
        watchlist
    }
}

export const createWatchlistAction = (watchlist) => {
    return {
        type: CREATE_WATCHLIST,
        watchlist
    }
}

export const updateWatchlistAction = (watchlist) => {
    return {
        type: UPDATE_WATCHLIST,
        watchlist
    }
}

export const deleteWatchlistAction = (watchlistId) => {
    return {
        type: DELETE_WATCHLIST,
        watchlistId
    }
}

export const deleteStockInWatchlistAction = (watchlistId, stockId) => {
    return {
        type: DELETE_STOCK_IN_WATCHLIST,
        watchlistId,
        stockId,
    }
}

export const resetWatchlistAction = () => {
    return {
        type: RESET_WATCHLIST
    }
}

// export const addStockToWatchlist = (watchlist) => {
//     return {
//         type: ADD_STOCK_TO_WATCHLIST,
//         watchlist
//     }
// }

// (3) thunk
export const getWatchlistsThunk = () => async (dispatch) => {
    const res = await fetch("/api/watchlists/");
    const data = await res.json();

    if (!res.ok) {
        return {errors: data.errors}
    }

    dispatch(getWatchlistsAction(data));
    return data;
}

export const getWatchlistByIdThunk = (watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${watchlistId}`);
    const data = await res.json();

    if (!res.ok) {
        return {errors: data.errors}
    }

    dispatch(getWatchlistByIdAction(data));
    return data;
}

export const createWatchlistThunk = (watchlist) => async (dispatch) => {
    const res = await fetch("/api/watchlists/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(watchlist)
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(createWatchlistAction(data));
}

export const updateWatchlistThunk = (watchlistId, watchlist) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${watchlistId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(watchlist)
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(createWatchlistAction(data));
    return data;
}

export const deleteWatchlistThunk = (watchlistId) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${watchlistId}`, {
        method: "DELETE"
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(deleteWatchlistAction(watchlistId));
    return data;
}

export const deleteStockInWatchlistThunk = (watchlistId, stockId) => async (dispatch) => {
    const res = await fetch(`/api/watchlists/${watchlistId}/stocks/${stockId}`, {
        method: "DELETE"
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(deleteStockInWatchlistAction(watchlistId, stockId));
    return data;
}

export const addStockToWatchlistThunk = (watchlistId, stockId) => async (_dispatch) => {
    const res = await fetch(`/api/watchlists/${watchlistId}/stocks/${stockId}`)

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    return data
}

// (4) reducer
const initialState = { allWatchlists: {}, currentWatchlist: {} }
const watchlistReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_WATCHLISTS: {
            const allWatchlists = {};
            action.watchlists.forEach(w => allWatchlists[w.id] = w);
            return {...state, allWatchlists: allWatchlists}
        }
        case GET_WATCHLIST_BY_ID: {
            return {
                ...state,
                currentWatchlist: action.watchlist
            }
        }
        case CREATE_WATCHLIST: {
            return {
                ...state,
                allWatchlists: {
                    ...state.allWatchlists,
                    [action.watchlist.id]: action.watchlist
                },
                currentWatchlist: action.watchlist
            }
        }
        case UPDATE_WATCHLIST: {
            return {
                ...state,
                allWatchlists: {
                    ...state.allWatchlists,
                    [action.watchlist.id]: action.watchlist
                },
                currentWatchlist: action.watchlist
            }
        }
        case DELETE_WATCHLIST: {
            const newWatchlist = {...state};
            delete newWatchlist.allWatchlists[action.watchlistId];
            if (newWatchlist.currentWatchlist.id === action.watchlistId) {
                newWatchlist.currentWatchlist = {}
            }
            return newWatchlist;
        }
        case DELETE_STOCK_IN_WATCHLIST: {
            const newWatchlist = {...state};

            const stocks = newWatchlist.allWatchlists[action.watchlistId].watchlist_stocks;

            newWatchlist.allWatchlists[action.watchlistId].watchlist_stocks = stocks.filter(stock => stock.id !== action.stockId)

            const stocks2 = newWatchlist.currentWatchlist.watchlist_stocks;

            newWatchlist.currentWatchlist.watchlist_stocks = stocks2.filter(stock => stock.id !== action.stockId);

            return newWatchlist;
        }
        case RESET_WATCHLIST: {
            return {...state,  allWatchlists: {}, currentWatchlist: {} }
        }
        default:
            return state;
    }
}

export default watchlistReducer;
