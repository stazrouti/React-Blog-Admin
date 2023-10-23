import { useState } from "react";
import { Navigate } from "react-router-dom";

/* this is the backend url */
function Domain() {
  const port = "http://127.0.0.1:8000/api";
  return port;
}
/* const authToken=null;
export function SetAuthToken(getauthToken) {
  //const authToken = localStorage.getItem('authToken');
  // const authToken = authToken; 
  authToken=getauthToken ;
  
} */
//retrieve the token from local storage to use it as component
export function AuthToken() {
  /* const authToken = localStorage.getItem('authToken'); */
  const authToken = sessionStorage.getItem('authToken');
  /* const authToken = authToken; */
  return authToken ;
  
}
export  function AdminName(){
  const AdminName = sessionStorage.getItem('AdminName');
  return AdminName;
}
/* window.addEventListener("beforeunload", function (event) {
  // Check if the user is closing the window
  if (event.currentTarget.location.pathname !== '/Admin') {
    // Prompt the user to confirm the action
    event.returnValue = "Are you sure you want to log out?";
  } else {
    // User is navigating within the page, remove the token
    localStorage.removeItem('authToken');
  } 
});*/

export function Logout()
{
  sessionStorage.clear();

  window.addEventListener("beforeunload", function (event) {

    localStorage.removeItem('authToken');
  });
  window.location.href = "http://localhost:3000/Login";

}
/* const api = axios.create({
  baseURL: Domain(),
});

// Add an interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); */
export default Domain;