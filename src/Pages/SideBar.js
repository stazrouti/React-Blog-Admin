import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFileAlt, faFolder, faInbox, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <nav className="border bg-white h-screen p-4">
      {/* link to dashboard */}
      <Link to="/Admin/Dashboard">
        <div className="text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2">
          <FontAwesomeIcon icon={faHome} /> Dashboard
        </div>
      </Link>
      {/* link to posts */}
      <Link to="/Admin/Posts">
        <div className="text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2">
          <FontAwesomeIcon icon={faFileAlt} /> Posts
        </div>
      </Link>
    {/* link to Categories */}
      <Link to="/Admin/Categories">
        <div className="text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2">
          <FontAwesomeIcon icon={faFolder} /> Categories
        </div>
      </Link>
      {/* link to Inbox */}
      <Link to="/Admin/Inbox">
        <div className="text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2">
          <FontAwesomeIcon icon={faInbox} /> Inbox
        </div>
      </Link>
    {/* link to Account */}
      <Link to="/Admin/Accounts">
        <div className="text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2">
          <FontAwesomeIcon icon={faUser} /> Accounts
        </div>
      </Link>
    </nav>
  );
}

export default SideBar;
