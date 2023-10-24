import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Domain from '../../Api/Api';
import { AuthToken } from '../../Api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Loading from '../../layouts/Loading';

function UserAccountManager({ user, onUpdate, onDelete }) {
  const [updating, setUpdating] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleUpdate = () => {
    // Make an API call to update the user data
    /* axios
      .put(`http://127.0.0.1:8000/Users/${user.id}`, updatedUser) // Replace with your actual API endpoint
      .then(response => {
        onUpdate(response.data);
        setUpdating(false);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        setUpdating(false);
      }); */

      Swal.fire({
        title: 'Are you sure you want to update this user information account?',
        icon: 'warning',
        html: `
          <p><b>Username</b>: ${updatedUser.name}</p>
          <p><b>Email</b>: ${updatedUser.email}</p>
        `,
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios
            .put(`${Domain()}/Users/${user.id}`,updatedUser,{
              headers: {
                'Authorization': 'Bearer ' + AuthToken(), // Include the token here
              }})
            .then((response) => {
              if (response.status === 200) {
                onUpdate(response.data);
                setUpdating(false);
                return response.data;
              } else {
                throw new Error(response.data.message.error);
              }
            })
            .catch((error) => {
              Swal.showValidationMessage(error.response.data.error ? error.response.data.error : error.response.data.message);
            });
        },
      }).then((result) => {
        if (result.isConfirmed) {
          onUpdate(updatedUser);
          setUpdating(false);
          Swal.fire('User updated', 'The account has been modify.', 'success');
        }
      });

  };
  
  const handleClose=()=>{
    setUpdating(false);
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this user account?',
      icon: 'warning',
      html: `
        <p><b>Username</b>: ${user.name}</p>
        <p><b>Email</b>: ${user.email}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios
          .delete(`${Domain()}/Users/${user.id}`,{
            headers: {
              'Authorization': 'Bearer ' + AuthToken(), // Include the token here
            }})
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw new Error(response.data.message.error);
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(error.response.data.error ? error.response.data.error : error.response.data.message);
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(user.id);
        Swal.fire('User Deleted', 'The account has been deleted.', 'success');
      }
    });
  };

  return (
    <>
      <tr className="shadow-md items-center p-2 mb-2 justify-center gap-9 rounded-lg ml-10 bg-white">
        <td className="border p-2">{user.name}</td>
        <td className="border p-2">{user.email}</td>
        <td className="border p-2">
          {user.email_verified_at !== null ? user.email_verified_at : <FontAwesomeIcon className='text-red-600' icon={faTimes} />}
        </td>
        <td className="border p-2">{user.created_at}</td>
        <td className="border p-2">
          <FontAwesomeIcon className="text-indigo-500" icon={faEye} />
        </td>
        <td className="border p-2">
          <FontAwesomeIcon onClick={handleDelete} className="text-indigo-500 hover:cursor-pointer" icon={faTrash} />
        </td>
        <td className="border p-2">
          <FontAwesomeIcon onClick={() => setUpdating(true)} className="text-indigo-500 hover:cursor-pointer" icon={faPen} />
        </td>
      </tr>

      {updating && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Update User</h2>
          <input
            type="text"
            placeholder="New Username"
            value={updatedUser.name}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="New Email"
            value={updatedUser.email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 mb-2 rounded"
            onClick={handleClose}>
              Close
          </button>
        </div>
      )}
    </>
  );
}

function Accounts() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${Domain()}/Users`,{
        headers: {
          'Authorization': 'Bearer ' + AuthToken(), // Include the token here
        }})
      .then(response => {
        setUsersData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  const updateUser = (updatedUser) => {
    const updatedUsers = usersData.map(user => (user.id === updatedUser.id ? updatedUser : user));
    setUsersData(updatedUsers);
  };

  const deleteUser = (userId) => {
    const updatedUsers = usersData.filter(user => user.id !== userId);
    setUsersData(updatedUsers);
  };
  
  return (
    <AdminLayout>
    {loading ? (
      
      <Loading/>
    ) : (
      <div className="container mx-auto mt-8 px-10 bg-white ml-5 pb-4">
        <div className="max-w-screen-lg">
          <h1 className="text-3xl font-bold mb-4">User Accounts</h1>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border p-2 pl-3 pr-5">Username</th>
                <th className="border p-2 pl-3 pr-5">Email</th>
                <th className="border p-2 pl-3 pr-5">Verification</th>
                <th className="border p-2 pl-3 pr-5">Join date</th>
                <th className="border p-2 pl-3 pr-5">View</th>
                <th className="border p-2 pl-3 pr-5">Delete</th>
                <th className="border p-2 pl-3 pr-5">Modify</th>
              </tr>
            </thead>
            <tbody className='text-center'>
                {usersData.map(user => (
                  <UserAccountManager
                    key={user.id}
                    user={user}
                    onUpdate={updateUser}
                    onDelete={deleteUser}
                  />
                ))
                }
            </tbody>
          </table>
        </div>
      </div>
              )}
    </AdminLayout>
  );
}

export default Accounts;
