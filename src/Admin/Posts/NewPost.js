import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../Pages/AdminLayout';
import Swal from 'sweetalert2';

function AddPost() {
  const [formData, setFormData] = useState({
    title: '',
    picture: '',
    content: '',
    category_id: [], // Initialize to an empty array
  });

  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    // Fetch categories from your API and populate the categories state
    axios.get('http://127.0.0.1:8000/api/Categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'category_id') {
      // If it's the category select, split the value into an array
      const categoryValues = value.split(':');
      // Ensure that category_id is a single integer
      setFormData({ ...formData, [name]: parseInt(categoryValues[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to backend API to create a new post
      axios.post('http://127.0.0.1:8000/api/Posts/New', formData)
      .then(response => {
        // Handle successful response (e.g., show a success message)
        console.log('New post created:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Post Created',
          html: `
            Title: ${formData.title}<br>
            Picture: ${formData.picture}<br>
            Content: ${formData.content}<br>
            Category: ${getCategoryName(formData.category_id)} <!-- Display category name -->
          `,
        });

        // Clear the form
        /* setFormData({
          title: '',
          picture: '',
          content: '',
          category_id: '', // Reset to an empty string
        }); */
      })
      .catch(error => {
        console.error('Error creating post:', error);
        Swal.fire({
          icon: 'error',
          title: 'Post Creation failed',
          html: `
          ${error}
          Error Message: ${error.response ? error.response.data.message : 'An error occurred.'}
          `,
        });
      }); 



    // Clear the form
    /* setFormData({
      title: '',
      picture: '',
      content: '',
      category_id: [], // Reset to an empty array
    }); */
    console.log(formData);
    //this function to get category name by its id
    function getCategoryName(categoryId) {
      const category = categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'N/A';
    }
  
  //console.log("categoryname "+getCategoryName(formData.category_id));
  };

  const handleClear = (e) => {
    setFormData({
      title: '',
      picture: '',
      content: '',
      category_id: [], // Reset to an empty array
    });
  };

  return (
    <div style={{ width: '900px' }} className=" shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center  rounded-lg ml-10 bg-white ">
      <h2 className="text-2xl font-semibold mb-4 text-center hover:text-indigo-500">Add New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full p-1">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border  rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="picture" className="text-lg">Picture URL</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-lg">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category_id" className="text-lg">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
          Submit
        </button>
        <button type="button" onClick={handleClear} className="bg-indigo-500 text-white py-2 px-4 rounded-lg ml-3 hover:bg-indigo-600 transition duration-300">
          Clear
        </button>
      </form>
    </div>
  );
}

function Add() {
  return (
    <AdminLayout Content={<AddPost />} />
  );
}

export default Add;
