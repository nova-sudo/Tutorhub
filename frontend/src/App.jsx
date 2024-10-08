  import React from "react"
  import { useEffect } from 'react';
  import { useCallback } from "react";
  import { Link,BrowserRouter,Routes, Route } from 'react-router-dom';
  import Particles from 'react-tsparticles';
  import { loadFull } from "tsparticles";
  import Moderator from "./Moderator";
  import './App.css';
 
  import Home from "./Home/Home";
  import Login from "./Home/Login";
  import Signup from "./RegiComp/Signup";
 import Dashboard from "./Dashboard";
  import Contact from "./Home/ContactUs";
  import Profile from "./Profile";
  import Matching from "./Matching";
  import ChatHome from "../chatclient/src/components/chatHome";
  import ChatPage from "../chatclient/src/components/ChatPage";
  
  import Schedule from "./Schedule";


  import socketIO from "socket.io-client"; // Socket.IO client for real-time communication
  // Connect to the Socket.IO server running on localhost at port 4000
  const socket = socketIO.connect("http://localhost:4000");

const getRandomDelay = () => Math.random() * 0.5;

  function App() {
    const options = {
      particles: {
        number: {
          value: 20,
          density: {
            enable: false,
            area: 800
          }
        },
        color: {
          value: ["#FF9797"]
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 1
        },
        size: {
          value: { min: 4, max: 9 }
        },
        links: {
          enable: true,
          distance: 150,
          color: "#808080",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          outModes: "out"
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab"
          },
          onClick: {
            enable: false,
            mode: ""
          }
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 1
            }
          },
          push: {
            quantity: 2
          }
        }
      }
    };
    const particlesInit = useCallback(async (engine) => {
      await loadFull(engine);
    }, []);

    useEffect(() => {
      const spans = document.querySelectorAll('.text-5xl span');
      spans.forEach(span => {
        span.style.animationDelay = `${getRandomDelay()}s`;
      });
    }, []);
  
    
      return (
        
          <BrowserRouter>
          < Particles options={options} init={particlesInit} />
            <div className=' bg-white  flex flex-col h-screen font-chart text-emerald-400 pt-8 overflow-scroll'>
            <div className="flex justify-between items-center font-chart pl-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
  <a href="/" className="text-5xl font-extrabold pt-6 pl-6">
    <span>T</span>
    <span>U</span>
    <span>T</span>
    <span>O</span>
    <span>R</span>
    <span>H</span>
    <span>U</span>
    <span>B</span>
  </a>

  <div className="flex mr-8">
  <button onClick={() => Moderator.redirectTo('/home')} className="px-8 text-2xl text-black">
              Home
            </button>
            <button onClick={() => Moderator.redirectTo('/contactus')} className="px-2 text-2xl text-black">
              Contact Us
            </button>
            <button onClick={() => Moderator.redirectTo('/login')} className="px-6 mx-4 text-2xl text-black bg-red-300 rounded-full">
              Login
            </button>
  </div>
</div>



    
              <Routes>
              <Route path="/login" element={<Login/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/contactus" element={<Contact/>}/>
       
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/matching" element={<Matching/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
         
        <Route path="/chathome" element={<ChatHome socket={socket} />} />
          
          <Route path="/chatpage" element={<ChatPage socket={socket} />} />
        <Route path="/schedule" element={<Schedule/>}/>
        
              </Routes>

              
            </div>
           

          </BrowserRouter>
          
       
      );
  }

  export default App
