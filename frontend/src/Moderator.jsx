import axios from 'axios';

const Moderator = {

    

  register: async (userData) => {
    try {
      const response = await axios.post('http://localhost:3301/register', userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to register');
    }
  },

  login: async (userId, password) => {
    try {
      const response = await axios.post('http://localhost:3301/login', { userId, password });
      return response.data;
    } catch (error) {
      return { error: 'Failed to login' };
    }
  }, 
  redirectTo: (path) => {
    window.location.href = path;
  },

};

export default Moderator;
