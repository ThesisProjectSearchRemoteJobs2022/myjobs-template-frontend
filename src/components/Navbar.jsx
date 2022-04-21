import React from "react";
import {Link} from 'react-router-dom';

function Button({text, bg, padding}) {
  return (
    <div>
      <button
        className={`
          ${padding || 'px-6 py-2'} text-sm font-semibold uppercase 
          rounded-sm text-white transition ${bg}`}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}


function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 h-16 shadow-md border-b-2 border-gray-100 bg-gray-900">
      <nav className="flex items-center container mx-auto h-full justify-between">
        <h1 className="font-semibold uppercase text-lg text-gray-200">
          📢 JoBoard-pe
        </h1>
        <div>
          <ul className="flex items-center space-x-10 text-sm">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-gray-100">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/docs" className="text-gray-400 hover:text-gray-100">
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {/* <Link to="/login" className="text-gray-400 hover:text-gray-100">
          <Button text="Login" bg="bg-gradient-to-r from-purple-500 to-blue-500"/>
          
          </Link> */}
        </div>

        {/* <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"> */}
        <div >
          <a
            href="/login"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href="/register"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign up
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
