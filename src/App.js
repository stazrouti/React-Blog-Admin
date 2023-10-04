import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
/* import AdminLayout from "./Pages/AdminLayout"; */
import Dashboard from "./Admin/Dashboard/Dashboard";
import Posts from "./Admin/Posts/Posts";
import Categories from "./Admin/Categories/Categories";
import Inbox from "./Admin/Inbox/Inbox";
import Accounts from "./Admin/Accounts/Accounts";
import Add from "./Admin/Posts/NewPost";




function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/Admin" element={<Dashboard />} />
      <Route path="/Admin/Dashboard" element={<Dashboard />} />
      <Route path="/Admin/Posts" element={<Posts />} />
      <Route path="/Admin/Post/New" element={<Add />} />
      <Route path="/Admin/Categories" element={<Categories />} />
      <Route path="/Admin/Inbox" element={<Inbox />} />
      <Route path="/Admin/Accounts" element={<Accounts />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/* import React from "react";
import { BrowserRouter } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./Pages/AdminLayout";
import Dashboard from "./Admin/Dashboard";



function App() {
  return (
    <BrowserRouter>
      <Router>
        <Routes>
          <Route path="/admin" render={() => (
            <AdminLayout>
              <Routes>
                <Route path="/Admin/Dashboard" component={Dashboard} />
                
              </Routes>
            </AdminLayout>
          )} />
        </Routes>
      </Router>
    </BrowserRouter>

  );
}

export default App;
 */