import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Loading from '../../layouts/Loading';
import Domain from '../../Api/Api';
import { AuthToken } from '../../Api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
//get all categories
  useEffect(() => {
    axios
      .get(`${Domain()}/Categories`,{
        headers: {
          'Authorization': 'Bearer ' + AuthToken(), // Include the token here
        }})
      .then((response) => {
        setCategoriesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
        setLoading(false);
      });
  }, []);
  //add a new category
  const AddCategory = (e) => {
    Swal.fire({
      title: 'Add new Category',
      html:
        '<input id="categoryName" class="swal2-input" placeholder="Category Name">' +
        '<input id="categoryDescription" class="swal2-input" placeholder="Category Description">',
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const categoryName = document.getElementById('categoryName').value;
        const categoryDescription = document.getElementById('categoryDescription').value;
  
        // You can handle form submission here (e.g., make an API call to add the category)
        return axios
          .post(`${Domain()}/Categories`, {
            categoryName: categoryName,
            categoryDescription: categoryDescription,
          },{
            headers: {
              'Authorization': 'Bearer ' + AuthToken(), // Include the token here
            }})
          .then((response) => {
            if (response.status === 200) {
              // Update the state with the new category
              const newCategory = {
                id:response.data.category.id,
                name: response.data.category.name,
                description: response.data.category.description,
              };
            setCategoriesData((prevCategories) => [...prevCategories,newCategory]);
            console.log(response.data)
            console.log("new cat",newCategory)
              return response.data;
            } else {
              throw new Error('Failed to add category.');
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Error: ${error.message}`);
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Category Added', 'The new category has been added.', 'success');
      }
    });
  };
  //dellete a category
  const DeleteCategory = (category) => {
    //console.log("categorie to delete",category.id)
    Swal.fire({
      title: 'Are you sure you wanna delete this category ?',
      icon: 'warning',
      html: `
        <p><b>Category Name </b>: ${category.name}</p>
        <p><b>Category Description </b>: ${category.description}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        // Make an API call to delete the category here
        // You can use axios or any other method for the API call
        return axios
          .delete(`${Domain()}/Categories/${category.id}`,{
            headers: {
              'Authorization': 'Bearer ' + AuthToken(), // Include the token here
            }})
          .then((response) => {
            if (response.status === 200) {
              const lastId = category.id;
              const updatedCategoriesData = categoriesData.filter((categories) => categories.id !== lastId);
              setCategoriesData(updatedCategoriesData);
              
              return response.data;
            }
           /*  else if(response.status === 400 && response.data==="Category has posts exists" ){
            Swal.showValidationMessage("this category conatian posts");

            } */
             else {
              throw new Error(response.data.message.error);
            }
          })
          .catch((error) => {
            console.log(error)
            Swal.showValidationMessage(error.response.data.error?error.response.data.error:error.response.data.message );
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the deletion success, e.g., remove the category from the frontend state
        // You can also show a success message here
        Swal.fire('Category Deleted', 'The category has been deleted.', 'success');
      }
    });
  };
  const UpdateCategory = (category) => {
    
    Swal.fire({
      title: 'You want to update this category?',
      icon: 'warning',
      html: `
        <div class="my-custom-dialog">
          <p><b>Category Name</b>: <input id="swal-input1" class="swal2-input" value="${category.name}"></p>
          <p><b>Category Description</b>: <textarea id="swal-input2" class="swal2-textarea">${category.description}</textarea></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        // Retrieve the updated values from the input fields
        const updatedName = document.getElementById('swal-input1').value;
        const updatedDescription = document.getElementById('swal-input2').value;
        return axios.put
        (`${Domain()}/Categories/${category.id}`,
        {
          Name: updatedName,
          Description: updatedDescription
        },
        {
          headers: {
            'Authorization': 'Bearer ' + AuthToken() // Include the token here
          }
        }
      )
        .then((response) => {
          if (response.status === 200) {
            const lastId=category.id;
            const updatedCategoriesData = [...categoriesData];
            const index = updatedCategoriesData.findIndex(category => category.id === lastId);
          
            if (index !== -1) {
              // Update the name and description of the category at the found index
              updatedCategoriesData[index].name = updatedName;
              updatedCategoriesData[index].description = updatedDescription;
            }
          
            // Set the state with the updated categories data
            setCategoriesData(updatedCategoriesData);
            
            return response.data;
          }
         /*  else if(response.status === 400 && response.data==="Category has posts exists" ){
          Swal.showValidationMessage("this category conatian posts");

          } */
           else {
            throw new Error(response.data.message.error);
          }
        })
        .catch((error) => {
          console.log(error)
          Swal.showValidationMessage(error.response.data.error?error.response.data.error:error.response.data.message );
        });
        // Handle the update logic, for example, make an API call here
        // Return the updated values or a success message in a Promise
        /*return new Promise((resolve) => {
          // You can make an API call here to update the category
          // Once the update is successful, resolve the promise with the updated values or a success message
          resolve({
            updatedName,
            updatedDescription,
          });
        }); */
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCategory = result.value;
        Swal.fire({
          title: 'Category Updated',
          icon: 'success',
          html: `<b>Category Name </b> : ${updatedCategory.updatedName}</br><b>Category Description </b>: ${updatedCategory.updatedDescription}`,
          confirmButtonText: 'OK',
        });
  
        // You can update the category in your state or UI as needed
        // For example, update the category with the new values
        // category.name = updatedCategory.updatedName;
        // category.description = updatedCategory.updatedDescription;
      }
    });
  };
  

  

  const CategoriesContent = (<>
  {loading ? 
      //loading style
      <Loading/>
 :(
    <div
      style={{ width: '900px' }}
      className="shadow-md px-1 space-x-8 mt-2 pt-2 pb-2 mb-2 justify-center gap-9 rounded-lg ml-10 bg-white"
    >
      <div className="flex flex-row m-4">
        <div onClick={AddCategory} className="border bg-white text-xl p-2 rounded-lg shadow-md p-4 cursor-pointer">
          <span className="text-indigo-500 p-3">
            <FontAwesomeIcon icon={faPlus} />
          </span>{' '}
          New category
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
  <thead>
    <tr>
      <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Name
      </th>
      <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Description
      </th>
      <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Delete
      </th>
      <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Modify
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {categoriesData.map((category, index) => (
      <tr key={index}>
        <td className="px-5 py-3 truncate w-25 truncate w-40 block overflow-hidden overflow-ellipsis">{category.name}</td>
        <td className="px-5 py-3 max-w-sm truncate  ">{category.description}</td>
        <td className="px-5 py-3 "  onClick={() => DeleteCategory(category)}>
          <FontAwesomeIcon
            className="text-indigo-500 cursor-pointer hover:text-indigo-700"
            icon={faTrash}
          />
        </td>
        <td className="px-6 py-4 " onClick={() => UpdateCategory(category)}>
          <FontAwesomeIcon
            className="text-indigo-500 cursor-pointer hover:text-indigo-700"
            icon={faPen}
          />
        </td>
      </tr>
    ))}
  </tbody>
  </table>
  </div>
  )}
</>
  );

  return <AdminLayout Content={CategoriesContent} />;
}

export default Categories;
