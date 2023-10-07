import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
/* import AdminLayout from "./Pages/AdminLayout"; */
import Dashboard from "./Admin/Dashboard/Dashboard";
import Posts from "./Admin/Posts/Posts";
import Categories from "./Admin/Categories/Categories";
import Inbox from "./Admin/Inbox/Inbox";
import Accounts from "./Admin/Accounts/Accounts";
import Add from "./Admin/Posts/NewPost";
import View from "./Admin/Posts/ViewPost";
import UpdatePost from "./Admin/Posts/UpdatePost";



function App() {

  return (
    //application routes
    <BrowserRouter>
      <Routes>
      <Route path="/Admin" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
      {/* Dashboard url */}
      <Route path="/Admin/Dashboard" element={<Dashboard />} />
      {/* get all posts */}
      <Route path="/Admin/Posts" element={<Posts />} />
      {/* Add a new post */}
      <Route path="/Admin/Post/New" element={<Add />} />
      {/* Update a  post */}
      <Route path="/Admin/Posts/Update/:id" element={<UpdatePost />} />
      {/* show post details */}
      <Route path="/Admin/Posts/:id" element={<View />} />
      {/* manage Categories */}
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