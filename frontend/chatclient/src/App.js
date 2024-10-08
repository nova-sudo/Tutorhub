// Import necessary modules and components
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Router components from React Router
import Home from "./components/chatHome"; // Component for the home page
import ChatPage from "./components/ChatPage"; // Component for the chat page


import socketIO from "socket.io-client"; // Socket.IO client for real-time communication
// Connect to the Socket.IO server running on localhost at port 4000
const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    // Set up the BrowserRouter for routing
    <BrowserRouter>
      <div>
        {/* Define routes for different components */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home socket={socket} />} />
          {/* Route for the chat page */}
          <Route path="/chat" element={<ChatPage socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
