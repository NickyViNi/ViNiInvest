export const recommendationCalculate = (analyses) => {
    const recommend = { "Buy": 0, "Sell": 0, "Hold": 0 };
    analyses?.forEach(a => {
        if (a.recommendation.toLowerCase() === "buy") {
            recommend.Buy += 1
        }
        if (a.recommendation.toLowerCase() === "sell") {
            recommend.Sell += 1
        }
        if (a.recommendation.toLowerCase() === "hold") {
            recommend.Hold += 1
        }
    })

    return recommend;
}
