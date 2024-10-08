import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "./assets/undraw_male_avatar_g98d.svg"; // Import your male avatar SVG file

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        const storedPassword = localStorage.getItem('password');

        if (storedUserId && storedPassword) {
          const response = await axios.post('http://localhost:3301/login', {
            userId: storedUserId,
            password: storedPassword
          });
          console.log(response.data); // Log the received response to see the structure
          setUserData(response.data); // Set the received user data
        } else {
          console.error('User credentials not found');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const redirectToRanking = () => {
    window.location.href = '/ranking';
  };

  const redirectToMatching = () => {
    window.location.href = '/matching';
  };

  const redirectToSchedule = () => {
    window.location.href = '/schedule';
  };

  return (
    <div className=" backdrop-blur-md rounded-full  p-8 mt-8  text-4xl flex items-center justify-center h-screen">
      {userData ? (
        <>
          <div className="login-form">
            <h1 className="text-4xl font-bold mb-4 text-center">{userData.name}</h1>
            <p className="text-gray-600 text-4xl mb-4 text-center">{userData.email}</p>
            <div className="text-center text-3xl">
              <p>Rank: {userData.rank}</p>
              <p>University ID: {userData.userId}</p>
              <p>College: {userData.college}</p>
              <p>Date of Birth: {formatDate(userData.dateOfBirth)}</p>
              <p>Age: {calculateAge(userData.dateOfBirth)}</p>
              <p>Level: {userData.level}</p>
              <p>Gender: {userData.gender}</p>
              {userData.tags && userData.tags.length > 0 && (
                <p>Tags: {userData.tags.join(', ')}</p>
              )}
            </div>
            <div className="mt-6 flex space-x-6 justify-center">
              
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-900 mx-auto"></div>
          <p className="text-gray-900 text-lg mt-4">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Profile;