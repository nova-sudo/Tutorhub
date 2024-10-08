import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userRank, setUserRank] = useState('');

  useEffect(() => {
    const fetchUserRank = async () => {
      try {
        const userId = '21100911'; // Replace '12345' with the actual user ID
        const response = await axios.get(`http://localhost:3301/userRank?userId=${userId}`);
        setUserRank(response.data.rank);
      } catch (error) {
        console.error('Error fetching user rank:', error);
      }
    };

    fetchUserRank();
  }, []);

  const goToProfile = () => {
    // Redirect to the Profile page
    window.location.href = '/profile';
  };

  const goToMatching = () => {
    // Redirect to the Matching page
    window.location.href = '/matching';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-chart mb-10">DASHBOARD</h1>
      <div className="flex items-center space-x-4">
        
        <button className="text-4xl px-4 py-2 bg-red-400 text-white rounded-full hover:bg-emerald-400" onClick={goToProfile}>
         Profile
        </button>
        <h2 className="text-4xl py-16 px-16 bg-white font-right rounded-full mx-10 text-emerald-400 animate-pulse">User Rank: {userRank}</h2>
        <button className="text-4xl px-4 py-2 bg-red-400 text-white rounded-full hover:bg-emerald-400" onClick={goToMatching}>
          Matching
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
