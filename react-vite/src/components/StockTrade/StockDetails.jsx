import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStockByIdThunk } from "../../redux/stocks";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import convertDate from '../../helpers/convertDate';
import convertDateTime from "../../helpers/convertDateTime";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function StockDetails () {
  const dispatch = useDispatch();
  const { stockId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentStock = useSelector(state => state.stocks.currentStock)
  useEffect(() => {
    const getData = async () => {
      await dispatch(getStockByIdThunk(stockId));
      setIsLoaded(true);
    }
    getData();
  }, [dispatch])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${currentStock.name} (${currentStock.symbol})`,
      },
    },
  };

  const labels = currentStock.prices?.sort((a, b) => b.id - a.id).map(p => convertDate(p.date))
    const data = {
      labels,
      datasets: [
        {
          label: 'Open Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.open_price),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Close Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.close_price),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'high Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.high_price),
          borderColor: 'pink',
          backgroundColor: 'pink',
        },
        {
          label: 'low Price',
          data: currentStock.prices?.sort((a, b) => b.id - a.id).map(p => p.low_price),
          borderColor: 'rgb(211, 211, 211)',
          backgroundColor: 'rgb(211, 211, 211)',
        },
      ],
    };
  if (!isLoaded) return <div style={{marginTop:"100px"}}><Loading /></div>
  return (
    <div>
      <h2 style={{marginTop:"100px"}}></h2>
      <div id="current-stock-line">
          <Line options={options} data={data} />
      </div>
      { currentStock?.transactions.length > 0 &&
      <table id="current-stock-transaction-table">
        <thead>
          <tr>
            <th scope="col" className="table-header" colSpan={6}>{currentStock.name} Transactions</th>
          </tr>
          <tr>
            <th scope="col">Portfolio</th>
            <th scope="col">Shares</th>
            <th scope="col">Type</th>
            <th scope="col">Price Per Unit</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
            {currentStock &&
              currentStock?.transactions?.sort((a, b) =>b.id - a.id).map(t => <tr key={t.id}>
                <th scope="row">{t.portfolio_id}</th>
                <td>{t.shares}</td>
                <td>{t.type}</td>
                <td>{t.price_per_unit}</td>
                <td>{convertDateTime(t.created_at)}</td>
                <td>{t.is_completed ? "Completed" : "Pending"}</td>
              </tr>)
            }
          </tbody>
      </table> }
    </div>
  )
}

export default StockDetails;
