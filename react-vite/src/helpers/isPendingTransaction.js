export const isPendingTransaction = (transactions) => {
    for (let transaction of transactions) {
        if (!transaction.is_completed) {
            return true;
        }
    }

    return false;
}
