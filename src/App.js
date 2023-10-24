import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Dashboard from "./Admin/Dashboard/Dashboard";
import Posts from "./Admin/Posts/Posts";
import Categories from "./Admin/Categories/Categories";
import Inbox from "./Admin/Inbox/Inbox";
import Accounts from "./Admin/Accounts/Accounts";
import Add from "./Admin/Posts/NewPost";
import View from "./Admin/Posts/ViewPost";
import UpdatePost from "./Admin/Posts/UpdatePost";
import ViewMessage from "./Admin/Inbox/ViewMessage";
import { AuthToken, Logout } from "./Api/Api";
import NotFound from "./layouts/PageNotFound";





function App() {
  /* const isAuthenticated = localStorage.getItem('authToken'); */
  /* const isAuthenticated = sessionStorage.getItem('authToken'); */
  const isAuthenticated = <AuthToken/>;
  const Redirect =<Navigate to="/Login" />;
/*   window.addEventListener("beforeunload", function (event) {
    localStorage.removeItem('authToken');
}); */

  return (
    //application routes
    <BrowserRouter>
      <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Logout" element={<Logout />} />
        <Route path="/" element={isAuthenticated?<Dashboard/>:Redirect} />

        <Route path="/Admin" element={isAuthenticated ? <Dashboard/> : Redirect} />
        {/* Dashboard url */}
        <Route path="/Admin/Dashboard" element={isAuthenticated ? <Dashboard/> : Redirect}/>
        
        {/* get all posts */}
        <Route path="/Admin/Posts" element={isAuthenticated ? <Posts/> : Redirect} />
        {/* Add a new post */}
        <Route path="/Admin/Post/New" element={isAuthenticated ? <Add/> : Redirect} />
        {/* Update a  post */}
        <Route path="/Admin/Posts/Update/:id" element={isAuthenticated ? <UpdatePost/> : Redirect} />
        {/* show post details */}
        <Route path="/Admin/Posts/:id" element={isAuthenticated ? <View/> : Redirect} />
        {/* manage Categories */}
        <Route path="/Admin/Categories" element={isAuthenticated ? <Categories/> : Redirect} />
        {/* manage contact messages */}
        <Route path="/Admin/Inbox" element={isAuthenticated ? <Inbox/> : Redirect} />
        <Route path="/Admin/Inbox/:id" element={isAuthenticated ? <ViewMessage/> : Redirect} />
        {/* manage users Accounts */}
        <Route path="/Admin/Accounts" element={isAuthenticated ? <Accounts/> : Redirect} />
        <Route path="*" element={<NotFound/>} />
      
        {/* {isAuthenticated ? <ProtectedRoutes/>:<Route path="/Login" element={<Login />} />} */}
{/*         <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/Admin" element={<Dashboard />} />
        
        <Route path="/Admin/Dashboard" element={<Dashboard />} />
        
        <Route path="/Admin/Posts" element={<Posts />} />
        
        <Route path="/Admin/Post/New" element={<Add />} />
        
        <Route path="/Admin/Posts/Update/:id" element={<UpdatePost />} />
        
        <Route path="/Admin/Posts/:id" element={<View />} />
        
        <Route path="/Admin/Categories" element={<Categories />} />
        <Route path="/Admin/Inbox" element={<Inbox />} />
        <Route path="/Admin/Inbox/:id" element={<ViewMessage />} />

        <Route path="/Admin/Accounts" element={<Accounts />} /> */}
        
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