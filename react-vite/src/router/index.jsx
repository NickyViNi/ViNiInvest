import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from "../components/HomePage"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
