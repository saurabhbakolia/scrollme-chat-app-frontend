import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOut } from '../services/firebase';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally, you could navigate to login page or show a message here
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>HomePage</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName || 'User'}!</p>
          <p>Email: {user.email}</p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  )
}

export default HomePage