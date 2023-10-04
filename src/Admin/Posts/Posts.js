import AdminLayout from "../../Pages/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faFilter, faEye, faHeart, faComments, faTrash, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function PostsData({ postsData, currentPage, itemsPerPage }) {
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the posts to display on the current page
  const postsToDisplay = postsData.slice(startIndex, endIndex);

  return (
    <div className="Border">
      <p className="px-10 space-x-8 m-2">Posts</p>

      {/* Render table headers */}
      <div className="flex shadow-md flex-row px-1 space-x-7 items-center pt-2 pb-2 mb-2 justify-center gap-9 rounded-lg ml-10 bg-white">
        <div className="Border">picture</div>
        <div className="Border truncate w-40">title</div>
        <div className="Border"><div className=" ">category</div></div>
        <div className="Border">likes</div>
        <div className="Border">comment</div>
        <div className="Border">View</div>
        <div className="Border">Delete</div>
        <div className="Border">Update</div>
      </div>

      {/* Render your posts data here */}
      {postsToDisplay.map(post => (
        <div key={post.id} className="flex shadow-md flex-row px-1 space-x-8 items-center pt-2 pb-2 mb-2 justify-center gap-9 rounded-lg ml-10 bg-white">
          <div className="Border"><img className="w-10 " alt="" src={post.picture} /></div>
          <div className="Border truncate w-40">{post.title}</div>
          <div className="Border"><div className=" w-20">{post.category_name}</div></div>
          <div className="Border"><FontAwesomeIcon className="text-indigo-500 pr-2" icon={faHeart} />{post.likes}</div>
          <div className="Border"><FontAwesomeIcon className="text-indigo-500 pr-2" icon={faComments} />{post.comment_count}</div>
          <div className="Border"><Link to={`/Admin/Posts/${post.id}`}><FontAwesomeIcon className="text-indigo-500" icon={faEye} /></Link></div>
          <div className="Border"><FontAwesomeIcon className="text-indigo-500" icon={faTrash} /></div>
          <div className="Border"><Link to={`/Admin/Posts/Update/${post.id}`}><FontAwesomeIcon className="text-indigo-500" icon={faPen} /></Link></div>
        </div>
      ))}
    </div>
  );
}

function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [postsData, setPostsData] = useState([]);
  //for search queary
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Filter posts based on the search query
  const filteredPosts = postsData.filter((post) =>
  post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Make an API GET request to retrieve all posts
    axios.get('http://127.0.0.1:8000/api/Posts')
      .then(response => {
        // Update the state with the received data (assuming it's an array)
        setPostsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  /* const totalPages = Math.ceil(postsData.length / itemsPerPage); */
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);


    const PostsContent = (<div>
      <div className="flex flex-row px-10 space-x-8 items-center pt-8 justify-center gap-3 ">
        <div className="border bg-white text-xl p-2 rounded-lg shadow-md p-4 cursor-pointer">
            <Link to="/Admin/Post/New">
              <span className="text-indigo-500 p-3">
              <FontAwesomeIcon icon={faPlus} /></span> New Post
            </Link>
        </div>
        <div className="border bg-white text-xl flex items-center p-2 rounded-lg shadow-md p-4 cursor-pointer">
          <span className="text-indigo-500 "><FontAwesomeIcon icon={faSearch} /></span>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange} // Handle input change
            className="ml-2 outline-none bg-white border-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* clear search bar */}
            {searchQuery && ( // Only show the clear button when searchQuery is not empty
            <button
              onClick={() => setSearchQuery("")}
              className="cursor-pointer focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            )}
        </div>
        <div className="border bg-white text-xl p-2 rounded-lg shadow-md p-4 cursor-pointer">
          <span className="text-indigo-500 p-4"><FontAwesomeIcon icon={faFilter} /></span>
          <select>
            <option>Date</option>
            <option>Likes</option>
            <option>Comments</option>
          </select> Filter
        </div>
      </div>
      <PostsData postsData={filteredPosts} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <div className="pagination m-3 text-center">
    {/* Render the "Previous" button only if there are more than one page and it's not the first page */}
    {totalPages > 1 && currentPage > 1 && (
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        className="mr-2 border bg-white p-3 w-20 hover:bg-indigo-400 hover:text-white"
      >
        Previous
      </button>
    )}
    <span>Page {currentPage} of {totalPages}</span>
    {/* Render the "Next" button only if there are more pages ahead */}
    {totalPages > 1 && currentPage < totalPages && (
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="ml-2 border bg-white p-3 w-20 hover:bg-indigo-400 hover:text-white"
      >
        Next
      </button>
    )}

      </div>
    </div>);
  return (
    <AdminLayout Content={PostsContent} />

  );
}

export default Posts;