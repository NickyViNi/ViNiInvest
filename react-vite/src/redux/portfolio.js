// (1) Action Type
const GET_PORTFOLIOS = "portfolio/getPortfolios";
const GET_PORTFOLIO_BY_ID = "portfolio/getPortfolioById";
const CREATE_PORTFOLIO = "portfolio/createPortfolio";


// (2) Action Creator
export const getPortfoliosAction = (portfolios) => {
    return {
        type: GET_PORTFOLIOS,
        portfolios
    }
}

export const getPortfolioByIdAction = (portfolio) => {
    return {
        type: GET_PORTFOLIO_BY_ID,
        portfolio
    }
}

export const createPortfolioAction = (portfolio) => {
    return {
        type: CREATE_PORTFOLIO,
        portfolio
    }
}

// (3) Thunk
export const getPortfoliosThunk = () => async (dispatch) => {
    const res = await fetch("/api/portfolios/");
    const data = await res.json();

    if (!res.ok) {
        return {errors: data.errors}
    }

    dispatch(getPortfoliosAction(data.Portfolios));
}

export const getPortfolioByIdThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/portfolios/${id}`);
    const data = await res.json();
    if (!res.ok) {
        return {errors: data}
    }

    dispatch(getPortfolioByIdAction(data));
}

export const createPortfolioThunk = (portfolio) => async (dispatch) => {
    const res = await fetch("/api/portfolios/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(portfolio)
    })

    const data = await res.json();

    if (!res.ok) {
        return {errors: data};
    }

    dispatch(createPortfolioAction(data));
}


// (4) Reducer
const initialState = { allPortfolios: {}, currentPortfolio: {} }
const portfolioReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PORTFOLIOS: {
            const allPortfolios = {};
            action.portfolios.forEach(p => allPortfolios[p.id] = p);
            return {...state, allPortfolios: allPortfolios}
        }

        case GET_PORTFOLIO_BY_ID: {
            return {
                ...state,
                currentPortfolio: action.portfolio
            }
        }

        case CREATE_PORTFOLIO: {
            return {
                ...state,
                allPortfolios: {
                    ...state.allPortfolios,
                    [action.portfolio.id]: action.portfolio
                },
                currentPortfolio: action.portfolio
            }
        }
        default:
            return state;
    }
}

export default portfolioReducer;
