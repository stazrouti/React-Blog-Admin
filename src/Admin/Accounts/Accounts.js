import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../Pages/AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPen,faEye,faXmark } from '@fortawesome/free-solid-svg-icons';

function UserAccountManager({ user, onUpdate, onDelete }) {
  const [updating, setUpdating] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleUpdate = () => {
    // Make an API call to update the user data
    axios.put(`http://your-api-url/users/${user.id}`, updatedUser) // Replace with your actual API endpoint
      .then(response => {
        onUpdate(response.data);
        setUpdating(false);
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        setUpdating(false);
      });
  };

  const handleDelete = () => {
    // Make an API call to delete the user account
    axios.delete(`http://your-api-url/users/${user.id}`) // Replace with your actual API endpoint
      .then(() => {
        onDelete(user.id);
        console.log('User account deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting user account:', error);
      });
  };

  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-4">User Account</h1> */}

      <div className="flex shadow-md flex-row space-x-8 items-center p-2 mb-2 justify-center gap-9 rounded-lg ml-10 bg-white">
        {/* <div className="flex-none w-10">
          <img className="" alt="img" src="" />
        </div> */}
        <div className="flex-grow w-40">
          <div className="truncate border">{user.name}</div>
        </div>
        <div className="flex-none w-25">
          <div>{user.email}</div>
        </div>
        {/* <div className="flex-none w-25">
          <div>{user.email_verified_at!==null?user.email_verified_at:<FontAwesomeIcon className='text-red-600' icon={faXmark} />}</div>
        </div> */}
        <div className="flex-none w-25">
          <div>{user.created_at}</div>
        </div>
        <div className="flex-none">
          <FontAwesomeIcon className="text-indigo-500" icon={faEye} />
        </div>
        <div className="flex-none">
          <FontAwesomeIcon onClick={handleDelete} className="text-indigo-500 hover:cursor-pointer" icon={faTrash} />
        </div>
        <div className="flex-none">
          <FontAwesomeIcon onClick={() => setUpdating(true)} className="text-indigo-500" icon={faPen} />
        </div>
      </div>


      {updating && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Update User</h2>
          <input
            type="text"
            placeholder="New Username"
            value={updatedUser.username}
            onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
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
        </div>
      )}
    </div>
  );
}

function Accounts() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    axios.get('http://127.0.0.1:8000/api/Users') // Replace with your actual API endpoint
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
      <div className="container mx-auto mt-8 px-10 bg-white ml-5 pb-4">
        <div className="max-w-screen-lg">
          <h1 className="text-3xl font-bold mb-4">User Accounts</h1>
          {loading ? (
            <p>Loading user data...</p>
          ) : (
            usersData.map(user => (
              <UserAccountManager
                key={user.id}
                user={user}
                onUpdate={updateUser}
                onDelete={deleteUser}
              />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}






/* function Accounts() {
  //const AccountsContent = <div className="container mx-auto mt-8 px-10 bg-white ml-5 " ><div className="max-w-screen-lg"></div>Accounts</div>;

  return (
    <AdminLayout Content={<UserAccountManager/>} />
  );
} */
export default Accounts;