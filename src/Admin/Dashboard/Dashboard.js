import React, { useState, useEffect } from 'react';
import AdminLayout from "../../layouts/AdminLayout";
import Domain from '../../Api/Api';
import { AuthToken } from '../../Api/Api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faComments, faHeart, faEye, faUserCheck, faUser, faFolder } from "@fortawesome/free-solid-svg-icons";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import Chart from 'chart.js/auto';
import Loading from '../../layouts/Loading';
import axios from 'axios';

/* AnalyticsCard component */
function AnalyticsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <FontAwesomeIcon icon={icon} className="text-4xl text-indigo-500" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
}

/* Dashboard component */
function Dashboard() {
  const [isLoading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    TotalPosts: 0,
    TotalComment: 0,
    TotalLikes: 0,
    TotalVisits: 0,
    TotalCategories: 0,
    TotalUsers: 0,
    ActifUsers: 0,
    MonthlyVisits: [],
    MonthlyPosts: [],
    MonthlyComments: [],
    MonthlyLikes: [],
  });

  useEffect(() => {
    axios.get(`${Domain()}/Dashboard`, {
      headers: {
        'Authorization': `Bearer ${AuthToken()}`,
      },
    })
      .then(response => {
        setDashboardData(response.data);
        setLoading(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(true); // Ensure loading state is updated even on error
      });
  }, []);

  const dashboardContent = isLoading ? (
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnalyticsCard title="Total Posts" value={dashboardData.TotalPosts} icon={faFileAlt} />
        <AnalyticsCard title="Total Comments" value={dashboardData.TotalComment} icon={faComments} />
        <AnalyticsCard title="Likes Received" value={dashboardData.TotalLikes} icon={faHeart} />
        <AnalyticsCard title="Total Visits" value={dashboardData.TotalVisits} icon={faEye} />
        <AnalyticsCard title="Total Categories" value={dashboardData.TotalCategories} icon={faFolder} />
        <AnalyticsCard title="Total Users" value={dashboardData.TotalUsers} icon={faUser} />
        {/* <AnalyticsCard title="Active Users" value={dashboardData.ActifUsers} icon={faUserCheck} /> */}
      </div>
      <Analytics
        Visits={dashboardData.MonthlyVisits}
        Posts={dashboardData.MonthlyPosts}
        Comments={dashboardData.MonthlyComments}
      />
    </div>
  ) : (
    <Loading />
  );

  return (
    <AdminLayout Content={dashboardContent} />
  );
}

/* Analytics component */
function Analytics({ Visits, Posts, Comments }) {
  if (Visits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mt-5">
        <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
        <p>No data available. Please check back later.</p>
      </div>
    );
  }

  const orderedMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const postCounts = new Array(12).fill(0);
  const TotalComment = new Array(12).fill(0);

  Posts.forEach(item => {
    const monthIndex = orderedMonths.indexOf(item.month);
    if (monthIndex !== -1) {
      postCounts[monthIndex] = item.post_count;
    }
  });

  Comments.forEach(item => {
    const monthIndex = orderedMonths.indexOf(item.month);
    if (monthIndex !== -1) {
      TotalComment[monthIndex] = item.comment_count;
    }
  });

  const VisitsChart = {
    labels: orderedMonths,
    datasets: [
      {
        label: 'Visits',
        data: Visits.map(item => item.visit_count),
        borderColor: 'rgba(255, 159, 0, 1)',  // Darker yellow
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Visits',
        type: 'bar',
        data: Visits.map(item => item.visit_count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  
  const PostsChart = {
    labels: orderedMonths,
    datasets: [
      {
        label: 'Posts',
        data: postCounts,
        borderColor: 'rgba(54, 162, 235, 1)',  // Darker blue
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Posts',
        type: 'bar',
        data: postCounts,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  
  const CommentsChart = {
    labels: orderedMonths,
    datasets: [
      {
        label: 'Comments',
        data: TotalComment,
        borderColor: 'rgba(153, 102, 255, 1)',  // Darker purple
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Comments',
        type: 'bar',
        data: TotalComment,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md my-5 p-2">
        <h2 className="text-2xl font-semibold mb-4">Visits Chart</h2>
        <Line data={VisitsChart} options={chartOptions} />
      </div>
      <div className="bg-white rounded-lg shadow-md my-5 p-2">
        <h2 className="text-2xl font-semibold mb-4">Posts Chart</h2>
        <Line data={PostsChart} options={chartOptions} />
      </div>
      <div className="bg-white rounded-lg shadow-md my-5 p-2">
        <h2 className="text-2xl font-semibold mb-4">Comments Chart</h2>
        <Line data={CommentsChart} options={chartOptions} />
      </div>
    </>
  );
}

export default Dashboard;
