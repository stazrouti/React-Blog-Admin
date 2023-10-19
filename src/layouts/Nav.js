import React from "react";
import { Link } from "react-router-dom";
function Nav(){
return(
    <nav className="border bg-white p-4 flex justify-between items-center">
        <Link to="/Admin/">
            <div className="">Blog Admin</div>
        </Link>
        <div className="flex items-center space-x-4">
            <div className="flex ">
                <p type="text" placeholder="Admin name" className="bg-white p-2 rounded" >Admin name</p>
                <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg" className="w-10 h-10 rounded" alt="" />
            </div>
        </div>
    </nav>

);
}
export default Nav;