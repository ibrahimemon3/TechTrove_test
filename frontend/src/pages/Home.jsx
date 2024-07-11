import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import SearchForm from '../SearchForm';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl mb-5'>{loggedInUser}</h1>
      <button
        onClick={handleLogout}
        className='bg-gradient-to-r from-blue-900 to-black hover:from-black hover:to-blue-900 text-white text-lg p-2 rounded-md cursor-pointer mb-5'
      >
        Logout
      </button>
      <SearchForm />
      <ToastContainer />
    </div>
  );
}

export default Home;
