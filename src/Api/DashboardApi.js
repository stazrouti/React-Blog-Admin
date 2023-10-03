import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Posts: {dashboardData.TotalPosts}</p>
      <p>Total Comments: {dashboardData.TotalComments}</p>
      <p>Total Likes: {dashboardData.TotalLikes}</p>
    </div>
  );
}

export default Dashboard;
