import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Domain from "../../Api/Api";
import { AuthToken } from "../../Api/Api";

function Getpost() {
    // Get the value of the "id" parameter from the URL
    const { id } = useParams();
    const postId = id;
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
      title: "",
      picture: "",
      content: "",
      category:postData.category,
    });
  
    useEffect(() => {
      axios
        .get(`${Domain()}/Posts/${postId}`,{
          headers: {
            'Authorization': 'Bearer ' + AuthToken(), // Include the token here
          }})
        .then((response) => {
          setPostData(response.data);
  
          // Set initial form data after receiving the response
          setFormData({
            title: response.data.title,
            picture: response.data.picture,
            content: response.data.content,
            category: response.data.category,
          });
  
          //setLoading(false);
          //get all categories
          axios
          .get(`http://127.0.0.1:8000/api/Categories`)
          .then((categoryResponse) => {
            // Handle the category data here, for example:
            const categoriesData = categoryResponse.data;
            
            console.log(categoriesData);
            // Do something with the categories data, like setting it in state
            setCategories(categoriesData);
          setLoading(false);

          })
          .catch((categoryError) => {
            console.error("Error fetching categories:", categoryError);
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, [postId]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
      
    const handleUpdate =(e)=>{
        e.preventDefault();
        Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to update this post',
            html: `
              New Title: ${formData.title}<br>
              New Picture: ${formData.picture}<br>
              new content: ${formData.content}<br>
              new Category: ${formData.category} <!-- Display category name -->
            `,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'yes, Update',
            confirmButtonColor: '#F53D65',
            denyButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .put(`http://127.0.0.1:8000/api/Posts/${postId}`,formData,{
                  headers: {
                    'Authorization': 'Bearer ' + AuthToken(), // Include the token here
                  }})
                .then((updateResponse) => {
                  
                    // Successful deletion, remove the post from the state
                    /* const updatedPostsData = postsData.filter((post) => post.id !== postId);
                    setPostsData(updatedPostsData); */
                    Swal.fire('Update!', '', 'success');
                    // Successful deletion, you can navigate to a different page or update the UI as needed.
                  
                })
                .catch((error) => {
                  console.error('Error updating post:', error);
                  Swal.fire('Error', 'An error occurred while updating the post try again', 'error');
                });
            } else if (result.isDenied) {
              Swal.fire('Cancelled', '', 'info');
            }
          });

    }
  
return (
    <div className=" shadow-md flex-row px-1  items-center mt-5 pl-5 pt-2 pb-2 mb-2 justify-center  rounded-lg ml-10 bg-white">
      {loading ? (
        <p>  <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        
      </svg>
      Processing...
    </p> // Show a loading indicator or message
      ) : (
        <form onSubmit={handleUpdate}>
          <h1 className="mt-2 mb-2 text-2xl font-semibold">Title : <input type="text" name="title" className="border-current" value={formData.title} onChange={handleChange}/></h1>
          <div className="w-2/3">
          <div>Picture URL: <input type="text" name="picture" value={formData.picture} onChange={handleChange} /></div>
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
            <span className="text-gray-600">category : </span> 
            <select name="category" onChange={handleChange}>
              {categories.map((category) => (
                <option  selected={postData.category === category.name} key={category.id} >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 mb-2 max-w-2xl">
            <textarea value={formData.content} name="content" cols={60} rows={15} onChange={handleChange}></textarea>
            
          </div>
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
        <button type="submit" class="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
            Update
        </button>
        </form>
      )}

    </div>
    );
  }
function UpdatePost()
{

    return(
    <AdminLayout Content={<Getpost/>}/>

    );
}
export default UpdatePost ;
