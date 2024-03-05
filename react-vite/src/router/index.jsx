import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from "../components/HomePage"
import PortfolioDetails from '../components/PortfolioDetails/PortfolioDetails';
import StockChartList from '../components/StockTrade/StockChartList';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/portfolios",
        element: <PortfolioDetails />
      },
      {
        path: "/stocks",
        element: <StockChartList />
      }

    ],
  },
]);
