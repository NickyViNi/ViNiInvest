const POST_TRANSACTION = "transaction/postTransaction";

//action:
export const postTransactionAction = (transaction) => {
    return {
        type: POST_TRANSACTION,
        transaction
    }
}

//thunk:
import * as stockActions from "./stocks";
export const postTransactionThunk = (transaction, portfolioId, stockId) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${stockId}/portfolios/${portfolioId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaction)
    })

    const data = await res.json();

    if (!res.ok || data.message) {
        return {errors: data};
    }

    dispatch(stockActions.getStockByIdAction(data));
    return data;
}

export const updateTransactionThunk = transaction => async (dispatch) => {
    const res = await fetch(`/api/transactions/${transaction.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaction)
    })

    const data = await res.json();

    if (!res.ok || data.message) {
        return {errors: data};
    }

    dispatch(stockActions.getStockByIdAction(data));
    return data;
}

export const deleteTransactionThunk = transactionId => async dispatch => {
    const res = await fetch(`/api/transactions/${transactionId}`, {
        method: "DELETE"
    });
    const data = await res.json();

    if (!res.ok || data.message) return { errors: data };
    dispatch(stockActions.getStockByIdAction(data));
    return data;
}

export const confirmTransactionThunk = transactionId => async dispatch => {
    const res = await fetch(`/api/transactions/${transactionId}`);
    const data = await res.json();

    if (!res.ok || data.message) return { errors: data };
    dispatch(stockActions.getStockByIdAction(data));
    return data;
}

// (4) Reducer
