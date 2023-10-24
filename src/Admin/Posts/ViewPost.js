import { useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Domain from "../../Api/Api";
import { AuthToken } from "../../Api/Api";
import { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Loading from "../../layouts/Loading";

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
    axios.get(`${Domain()}/Posts/${postId}`,{
      headers: {
        'Authorization': 'Bearer ' + AuthToken(), // Include the token here
      }})
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
  //Delete a comment relationale to a post
  let comment_body = ""; // Define variables to hold comment details
  let comment_username = "";
  let created_at = "";
  
  const handeleDeleteComment = (id) => {
    console.log("commentid", id);
  
    // Find the comment to delete
    const commentToDelete = postData.comments.find((comment) => comment.id === id);
  
    if (commentToDelete) {
      const comment_body = commentToDelete.body;
      const comment_username = commentToDelete.username;
      const created_at = commentToDelete.created_at;
  
      // Display a confirmation dialog using Swal
      Swal.fire({
        title: 'Delete Comment',
        text: 'Are you sure you want to delete this comment?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        html: `
          <p><strong>Username:</strong> ${comment_username}</p>
          <p><strong>Comment Body:</strong> ${comment_body}</p>
          <p><strong>Created At:</strong> ${created_at}</p>
        `,
      }).then((result) => {
        if (result.isConfirmed) {
          // Make an API call to delete the comment here
          axios
            .delete(`${Domain()}/Comment/${id}`,{
              headers: {
                'Authorization': 'Bearer ' + AuthToken(), // Include the token here
              }})
            .then((response) => {
              if (response.status === 200) {
                // Create a new object with updated comments by filtering out the deleted comment
                const updatedComments = postData.comments.filter((comment) => comment.id !== id);
                
                // Update the state with the new object
                setPostData({ ...postData, comments: updatedComments });
  
                // Display a success message
                Swal.fire('Comment Deleted', 'The comment has been deleted.', 'success');
              } else {
                throw new Error(response.data.message.error);
              }
            })
            .catch((error) => {
              Swal.fire('Error', error.response.data.error || error.response.data.message, 'error');
            });
        }
      });
    }
  };
  
  
  
  
  return ( <>
      {loading ? (
        // Show a loading indicator or message
        <Loading/>
      ) : (
        <div className=" shadow-md flex-row px-1  items-center mt-5 pl-5 pt-2 pb-2 mb-2 justify-center  rounded-lg ml-10 bg-white">
       
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
                <th className="py-2 px-3 bg-gray-200 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {postData.comments.map((comment, index) => (
                <tr key={index}>
                  <td className="py-2 px-3">{comment.username}</td>
                  <td className="py-2 px-3">{comment.body}</td>
                  <td className="py-2 px-3">{comment.created_at}</td>
                  <td className="py-2 px-3">{comment.updated_at}</td>
                  <td className="py-2 px-3 text-indigo-500 "><FontAwesomeIcon className="hover:cursor-pointer" onClick={()=>handeleDeleteComment(comment.id)} icon={faTrash} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </> }


          {/* Render other post data as needed */}
          </div>
      )}
      </>
  );
}

export default View;
