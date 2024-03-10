// (1) action type
const GET_WATCHLISTS = "watchlists/getWatchlists"
const GET_WATCHLISTBYID = "watchlists/getWatchlistById"
const CREATE_WATCHLIST = "watchlists/createWatchlist"
const UPDATE_WATCHLIST = "watchlists/updateWatchlist"
const DELETE_WATCHLIST = "watchlists/deleteWatchlist"
const RESET_WATCHLIST = "watchlists/resetWatchlist"


// (2) action
export const getWatchlistsAction = (watchlists) => {
    return {
        type: GET_WATCHLISTS,
        watchlists
    }
}

export const getWatchlistByIdAction = (watchlist) => {
    return {
        type: GET_WATCHLISTBYID,
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

export const deleteWatchlistAction = (watchlist) => {
    return {
        type: DELETE_WATCHLIST,
        watchlist
    }
}

export const resetWatchlistAction = () => {
    return {
        type: RESET_WATCHLIST
    }
}

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


// (4) reducer
