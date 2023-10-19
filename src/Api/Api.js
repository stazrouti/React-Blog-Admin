/* this is the backend url */
function Domain() {
  const port = "http://127.0.0.1:8000/api";
  return port;
}

//retrieve the token from local storage to use it as component
export function AuthToken() {
  const authToken = localStorage.getItem('authToken');
  return authToken ;
  
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