import { useParams } from "react-router-dom";
import AdminLayout from "../../Pages/AdminLayout";
import { useState, useEffect } from 'react';
import axios from "axios";

function View() {
  // Get the value of the "id" parameter from the URL
  const { id } = useParams();

  // Render the Getpost component and pass the postId as a prop
  return (
    <AdminLayout Content={<Getpost postId={id} />} />
  );
}

function Getpost({ postId }) {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API GET request to retrieve the post by postId
    axios.get(`http://127.0.0.1:8000/api/Posts/${postId}`)
      .then(response => {
        // Update the state with the received data
        setPostData(response.data);
        setLoading(false); // Data has been loaded
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Data loading failed
      });
  }, [postId]); // Include postId in the dependency array

  // Conditionally render content based on loading state
  return (
    <div className=" shadow-md flex-row px-1  items-center mt-5 pl-5 pt-2 pb-2 mb-2 justify-center  rounded-lg ml-10 bg-white">
      {loading ? (
        <p>  <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        
      </svg>
      Processing...
    </p> // Show a loading indicator or message
      ) : (
        <>
          <h1 className="mt-2 mb-2 text-2xl font-semibold">Title : {postData.title}</h1>
          <div className="w-2/3">
            <img src={postData.picture} alt="" className="w-full h-auto" />
          </div>
          <div className="mt-2 mb-2 max-w-2xl">
            <span className="text-gray-600">Created_at : </span>{postData.created_at}
          </div>
          <div className="mt-2 mb-2 max-w-2xl">
            <span className="text-gray-600">Updated at : </span>{postData.updated_at}
          </div>
          <div className="mt-2 mb-2 max-w-2xl">
            <span className="text-gray-600">Likes : </span> {postData.likes}
          </div>
          <div className="mt-2 mb-2 max-w-2xl">
            <span className="text-gray-600">Category : </span> {postData.category}
          </div>
          <div className="mt-2 mb-2 max-w-2xl">{postData.content}</div>
          {/* check if comments are available on this post */}
          {postData.comments.length ===0 ? 
          <div className="mt-2 mb-2 max-w-2xl text-red-500 text-lg font-bold">
          No Comments on this post
          </div>
         : 
          <>
          <div className="mt-2 mb-2 max-w-2xl ">Comments : </div>
          <div style={{ width: '50rem' }}>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-3 bg-gray-200 font-semibold">Username</th>
                <th className="py-2 px-3 bg-gray-200 font-semibold">Content</th>
                <th className="py-2 px-3 bg-gray-200 font-semibold">Created at</th>
                <th className="py-2 px-3 bg-gray-200 font-semibold">Updated at</th>
              </tr>
            </thead>
            <tbody>
              {postData.comments.map((comment, index) => (
                <tr key={index}>
                  <td className="py-2 px-3">{comment.username}</td>
                  <td className="py-2 px-3">{comment.body}</td>
                  <td className="py-2 px-3">{comment.created_at}</td>
                  <td className="py-2 px-3">{comment.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </> }


          {/* Render other post data as needed */}
        </>
      )}
    </div>
  );
}

export default View;
