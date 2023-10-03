import React from 'react';
import AdminLayout from "../Pages/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faComments, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from "chart.js"; // Import the CategoryScale
import Chart from 'chart.js/auto';

import  { useState, useEffect } from 'react';
import axios from 'axios';
/* for the AnalyticsCard template */
function AnalyticsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center">
        <div className="mr-10 ">
          <FontAwesomeIcon icon={icon} className="text-4xl text-indigo-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* chart Analytics component */
function Analytics() {
  // Sample data for Line Chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Views',
        data: [12, 29, 3, 5, 2, 3],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Explicitly specify the scale as CategoryScale
  const scales = {
    x: {
      type: 'category',
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mr-10 ml-10 mt-5 ">
      <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
      {/* Display a Line Chart with specified scales */}
      <Line data={chartData} options={{ scales }} />
    </div>
  );
}
/* some changes */
/* the main function that display dashbord data */
function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    TotalPosts: 0,
    TotalComments: 0,
    TotalLikes: 0,
  });

  useEffect(() => {
    // Make an HTTP GET request to the Laravel API URL
    axios.get('http://127.0.0.1:8000/api/Dashboard')
      .then(response => {
        // Update the state with the received data
        setDashboardData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const dashboardContent =
    <>
      <div className="container mx-auto mt-8 px-10">
        <div className="max-w-screen-lg">
          <div className="flex flex-wrap justify-center gap-4">
            <AnalyticsCard title="Total Posts" value={dashboardData.TotalPosts} icon={faFileAlt} />
            <AnalyticsCard title="Total Comments" value={dashboardData.TotalComment} icon={faComments} />
            <AnalyticsCard title="Likes Received" value={dashboardData.TotalLikes} icon={faHeart} />
            <AnalyticsCard title="Views" value="1205" icon={faEye} />
          </div>
        </div>
      </div>
      <Analytics />
    </>;
  return (
    <AdminLayout Content={dashboardContent} />

  );
}

/* function Dashboard() {
  const dashboardContent =
    <>
      <div className="container mx-auto mt-8 px-10">
        <div className="max-w-screen-lg">
          <div className="flex flex-wrap justify-center gap-4">
            <AnalyticsCard title="Total Posts" value="256" icon={faFileAlt} />
            <AnalyticsCard title="Total Comments" value="489" icon={faComments} />
            <AnalyticsCard title="Likes Received" value="732" icon={faHeart} />
            <AnalyticsCard title="Views" value="1205" icon={faEye} />
          </div>
        </div>
      </div>
      <Analytics />
    </>;

  return (
    <AdminLayout Content={dashboardContent} />
  );
} */

export default Dashboard;
