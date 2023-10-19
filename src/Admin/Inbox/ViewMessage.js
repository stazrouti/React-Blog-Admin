import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';

function ViewMessage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get('name');
  const email = queryParams.get('email');
  const subject = queryParams.get('subject');
  const date = queryParams.get('date');

  return (
    <AdminLayout>
    <div /* style={{marginLeft:'50%'}} */ className="w-full mx-auto mt-8 px-10 bg-white ml-5 pb-4 rounded ">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4">View Message</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-lg  mb-2"><span className='font-bold' >Name :</span> {name}</div>
            <div className="text-lg  mb-2"><span className='font-bold'>Email :</span> {email}</div>
            <div className="text-lg  mb-2"><span className='font-bold'>Date :</span> {date}</div>
            <div className="text-lg  mb-2 font-bold">Subject : </div><div>{subject}</div>
          {/* Render the rest of your message content here */}
        </div>
      </div>
    </div>
    
    </AdminLayout>
  );
}

export default ViewMessage;
