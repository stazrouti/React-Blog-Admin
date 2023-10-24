import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Domain from '../../Api/Api';
import { AuthToken } from '../../Api/Api';
import ViewMessage from './ViewMessage';
import Swal from 'sweetalert2';
import { faTrash,faEye } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigate,useNavigate } from 'react-router-dom';
import Loading from '../../layouts/Loading';

function ContactMessage({ message, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [read, setRead] = useState(message.read);


  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this contact message?',
      icon: 'warning',
      html: `
        <p><b>Name</b>: ${message.name}</p>
        <p><b>Email</b>: ${message.email}</p>
        <p><b>Subject</b>: ${message.subject}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios
          .delete(`${Domain()}/Contact/${message.id}`,{
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
            Swal.showValidationMessage(
              error.response.data.error ? error.response.data.error : error.response.data.message
            );
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(message.id);
        Swal.fire('Message Deleted', 'The contact message has been deleted.', 'success');
      }
    });
  };
  const handleOpenMessage = (message) => {
    /* const queryParams = new URLSearchParams();
    queryParams.append('name', message.name);
    queryParams.append('email', message.email);
    queryParams.append('subject', message.subject);

    // Construct the URL with query parameters
    const url = `/Inbox/${message.id}?${queryParams.toString()}`;

    // Use the Link component to navigate to the URL with query parameters
    return <Link to={url}></Link>; */
    setRead(true);
    axios
    .put(`${Domain()}/Contact/Read/${message.id}`, {
      read: true,
    },{
      headers: {
        'Authorization': 'Bearer ' + AuthToken(), // Include the token here
      }}
    )
    .then((response) => {
      // Handle the server response as needed
      console.log(response.data)
      // Update the message.read property
      message.read = true;
      setSelectedMessage(message);

      
    })
    .catch((error) => {
      // Handle errors
      console.log(error)
      
    });
    

    /* Navigate(`/Inbox/${message.id}?name=${message.name}&email=${message.email}&subject=${message.subject}&date=${message.date}`); */

  setSelectedMessage(message);
  };
  const closeMessage = () => {
    setSelectedMessage(null);
  };


  return (
    <tr
      className={` items-center p-2 mb-2 mt-2 justify-center gap-9 rounded-lg ml-10 hover:shadow-md hover:bg-gray-200 cursor-pointer ${
        message.read || read ? 'bg-white' : 'bg-gray-100'

      }`}
      onClick={() => handleOpenMessage(message)} // Handle click event to open the message
    >
      
      <td className="border p-2">{message.name}</td>
      <td className="border p-2">{message.email}</td>
      <td className="border p-2 max-w-xs truncate">{message.subject}</td>
      <td className="border p-2">{message.date}</td>
      <td className="border p-2">
        <Link to={`${message.id}?name=${message.name}&email=${message.email}&subject=${message.subject}&date=${message.date}`}>
            <FontAwesomeIcon className="text-indigo-500 hover:cursor-pointer" icon={faEye}/>
        </Link>
      </td>
      <td className="border p-2">
        <button onClick={handleDelete} className="text-indigo-500 hover:cursor-pointer">
           <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>


  );
}

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${Domain()}/Contact`,{
        headers: {
          'Authorization': 'Bearer ' + AuthToken(), // Include the token here
        }})
      .then((response) => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contact messages:', error);
        setLoading(false);
      });
  }, []);

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter((message) => message.id !== messageId);
    setMessages(updatedMessages);
  };
  
  return (
    <AdminLayout>
    {loading ? (
      <Loading/>
    ) : (
      <div className="container mx-auto mt-8 px-10 bg-white ml-5 pb-4 mb-5 rounded">
        <div className="max-w-screen-lg">
          <h1 className="text-3xl font-bold mb-4">Contact Messages</h1>
          <table className="min-w-full divide-gray-200 divide-y">
            <thead>
              <tr className='font-medium text-gray-500 uppercase text-xs'>
                <th className=" text-left p-2 pl-3 pr-5">
                  Name
                </th>
                <th className=" text-left p-2 pl-3 pr-5">
                  email
                </th>
                <th className=" text-left p-2 pl-3 pr-5">
                  subject
                </th>
                <th className=" text-left p-2 pl-3 pr-5">
                  Received
                </th>
                <th className=" text-left p-2 pl-3 pr-5">
                  Open
                </th>
                <th className=" text-left p-2 pl-3 pr-5">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
                {messages.map((message) => (
                  <ContactMessage key={message.id} message={message} onDelete={deleteMessage} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
              )}
      {/* <Route path="/Inbox/:id" render={({ match }) => <ViewMessage message={messages.find((msg) => msg.id === parseInt(match.params.id))} />} /> */}
    </AdminLayout>
  );
}

export default Inbox;
