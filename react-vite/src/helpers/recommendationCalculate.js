export const recommendationCalculate = (analyses) => {
    const recommend = {"Buy": 0, "Sell": 0, "Hold": 0};
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

    const values = Object.values(recommend);
    const total = values.reduce((a, c) => a + c, 0);
    if (total > 0 ) {
        recommend.Buy = (recommend.Buy / total).toFixed(2);
        recommend.Sell = (recommend.Sell / total).toFixed(2);
        recommend.Hold = (recommend.Hold / total).toFixed(2);
    }
    return recommend;
}
