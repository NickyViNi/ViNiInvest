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
    const res = await fetch(`/api/stocks/${stockId}/${portfolioId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(transaction)
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(stockActions.getStockByIdAction(data));
}



// (4) Reducer
// const initialState = { allStocks: {}, currentStock: {} }
// const transactionReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case POST_TRANSACTION: {

//         }
//         default:
//             return state;
//     }
// }

// export default transactionReducer;
