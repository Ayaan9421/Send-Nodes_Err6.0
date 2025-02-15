// verifyUser.js

export const verifyUser = async () => {
    // Retrieve the JWT token from localStorage or sessionStorage
    const token = localStorage.getItem('jwtToken'); // or sessionStorage.getItem('jwtToken')
  
    if (!token) {
      console.error('No token found');
      return { success: false, message: 'No token found' };
    }
  
    try {
      // Send the token to the backend for verification
      const response = await fetch('http://localhost:5000/api/verify/student', {
        method: 'GET', // or 'GET' depending on your backend API
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        },
      });
  
      // Parse the response
      const data = await response.json();
  
      if (response.ok) {
        // Token is valid
        return { success: true, user: data.user }; // Assuming the backend returns user data
      } else {
        // Token is invalid or expired
        console.error('Token verification failed:', data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return { success: false, message: 'Error verifying token' };
    }
  };