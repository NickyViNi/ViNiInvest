// (1) Action Type
const GET_PORTFOLIOS = "portfolio/getPortfolios";
const GET_PORTFOLIO_BY_ID = "portfolio/getPortfolioById";
const CREATE_PORTFOLIO = "portfolio/createPortfolio";


// (2) Action Creator
export const getPortfoliosAction = (portfilos) => {
    return {
        type: GET_PORTFOLIOS,
        portfilos
    }
}

export const getPortfolioByIdAction = (portfilo) => {
    return {
        type: GET_PORTFOLIO_BY_ID,
        portfilo
    }
}

export const createPortfolioAction = (portfilo) => {
    return {
        type: CREATE_PORTFOLIO,
        portfilo
    }
}

// (3) Thunk
export const getPortfoliosThunk = () => async (dispatch) => {
    const res = await fetch("/api/portfolios");
    if (res.ok) {
        const portfilos = await res.json();
        if (DataTransfer.errors) {
            return;
        }
        dispatch(getPortfoliosAction(portfilos))
    }
}


// (4) Reducer
