import React from 'react';
import AdminLayout from "../../layouts/AdminLayout";
import Domain from '../../Api/Api';
import { AuthToken } from '../../Api/Api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faComments, faHeart, faEye, faUserCheck, faUser, faFolder } from "@fortawesome/free-solid-svg-icons";
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


/* some changes */
/* the main function that display dashbord data */
function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    TotalPosts: 0,
    TotalComments: 0,
    TotalLikes: 0,
    Totalvisits: 0,
    TotalCategories:0,
    TotalUsers: 0,
    ActifUSers: 0,
    MonthlyVisits: [],
    MonthlyPosts: [],
  });

  useEffect(() => {
    /* const authToken = localStorage.getItem('authToken'); */
    // Make an HTTP GET request to the Laravel API URL
    axios.get(`${Domain()}/Dashboard`,{
      headers: {
        'Authorization': 'Bearer ' + AuthToken(), // Include the token here
      }})
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
            <AnalyticsCard title="Total Visits" value={dashboardData.TotalVisits} icon={faEye} />
            <AnalyticsCard title="Total Categories" value={dashboardData.TotalCategories} icon={faFolder} />
            <AnalyticsCard title="Total Users" value={dashboardData.TotalUsers} icon={faUser} />
            <AnalyticsCard title="Actif Users" value={dashboardData.ActifUsers} icon={faUserCheck} />
          </div>
        </div>
      </div>
      <Analytics Visits={dashboardData.MonthlyVisits} Posts={dashboardData.MonthlyPosts} Comments={dashboardData.MonthlyComments} Likes={dashboardData.MonthlyLikes}/>
    </>;
  return (
    <AdminLayout Content={dashboardContent} />

  );
}
/* chart Analytics component */
function Analytics({Visits,Posts,Comments}) {
  const MonthlyVisits=Visits;
  const MonthlyPosts=Posts;
  const MonthlyComments=Comments;
  
  //console.log("month 1",MonthlyVisits[0].visit_count);
  //console.log("Month 1 visit count:", MonthlyVisits[0].visit_count);
  if (MonthlyVisits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mr-10 ml-10 mt-5">
        <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
        <p>Loading data...</p>
      </div>
    );
  }  
  console.log("month data",MonthlyVisits);

  // Sample data for Line Chart
  const orderedMonths = [
    'January', 'February', 'March', 'April','May','June',
    'July', 'August','September', 'October', 'November', 'December'
  ];
  
  const postCounts = new Array(12).fill(0);
  const commentCounts = new Array(12).fill(0);
  
  
  MonthlyPosts.forEach(item => {
    const monthIndex = orderedMonths.indexOf(item.month);
    if (monthIndex !== -1) {
      postCounts[monthIndex] = item.post_count;
    }
  });
  MonthlyComments.forEach(item => {
    const monthIndex = orderedMonths.indexOf(item.month);
    if (monthIndex !== -1) {
      commentCounts[monthIndex] = item.comment_count; // Use item.comment_count
    }
  });

  
  const chartData = {
    labels: orderedMonths,
    datasets: [
      {
        label: 'Visits',
        data: MonthlyVisits.map(item => item.visit_count),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Posts',
        data: postCounts,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Comments',
        data: commentCounts,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: false,
      },
      
    ],

  };
  
  
  // You will need to replace "item.visit_count2" and the color accordingly with your second dataset.
  



/*   const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Views',
        data: [MonthlyVisits[0].visit_count, 29, 3, 5, 2, 3],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  }; */

  // Explicitly specify the scale as CategoryScale
  const scales = {
    x: {
      type: 'category',
    },
  };
 
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mr-10 ml-10 mt-5 mb-5">
      <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
      {/* Display a Line Chart with specified scales */}
      <Line data={chartData} options={{ scales }} />
      {/* <Line data={chartData2} options={{ scales }} /> */}
    </div>
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
