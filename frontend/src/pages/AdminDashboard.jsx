import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/AdminDashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalytics(response.data);

    } catch (err) {
      console.log(err);
    }

  };

  if (!analytics) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading Dashboard...
      </h2>
    );
  }

  // Revenue Graph
  const revenueData = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Revenue",
        data: [analytics.totalRevenue],
        backgroundColor: "#0f766e",
        borderRadius: 8,
      },
    ],
  };

  // Sales Distribution
  const salesData = {
    labels: ["Orders", "Products", "Users"],
    datasets: [
      {
        data: [
          analytics.totalOrders,
          analytics.totalProducts,
          analytics.totalUsers,
        ],
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#F97316",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Monthly Revenue (Sample)
  const monthlyRevenue = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ],

    datasets: [
      {
        label: "Monthly Revenue",
        data: [2000, 5000, 3500, 6500, 7000, analytics.totalRevenue],
        borderColor: "#0f766e",
        backgroundColor: "#99f6e4",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (

    <div className="admin-dashboard">

      <h1 className="dashboard-heading">
        📊 Admin Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Welcome to MedCart Admin Panel
      </p>

      <div className="cards">

        <div className="card revenue">

          <h3>Total Revenue</h3>

          <h1>₹ {analytics.totalRevenue}</h1>

        </div>

        <div className="card orders">

          <h3>Total Orders</h3>

          <h1>{analytics.totalOrders}</h1>

        </div>

        <div className="card products">

          <h3>Total Products</h3>

          <h1>{analytics.totalProducts}</h1>

        </div>

        <div className="card users">

          <h3>Total Users</h3>

          <h1>{analytics.totalUsers}</h1>

        </div>

      </div>

      <div className="charts">

        <div className="chart-box">

          <h2>📈 Revenue</h2>

          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />

        </div>

        <div className="chart-box">

          <h2>🥧 Sales Distribution</h2>

          <Doughnut
            data={salesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />

        </div>

      </div>

      <div className="chart-box full">

        <h2>📊 Monthly Revenue</h2>

        <Line
          data={monthlyRevenue}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />

      </div>

    </div>

  );

}

export default AdminDashboard;