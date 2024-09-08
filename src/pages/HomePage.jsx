import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signOut } from '../services/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Flex, Text, Button } from '@chakra-ui/react';

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
    <Flex direction="column" minH="100vh" bg="gray.50">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Main Content */}
      <Box flex="1" p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Text fontSize="3xl" fontWeight="bold" mb={4} textAlign="center" color="brand.800">
          Welcome to ScrollMe Chat
        </Text>
        {user ? (
          <Box textAlign="center" maxW="md" bg="white" p={6} borderRadius="md" shadow="md">
            <Text fontSize="xl" mb={2} color="brand.700">Welcome, {user.displayName || 'User'}!</Text>
            <Text fontSize="md" color="gray.600" mb={4}>Email: {user.email}</Text>
            <Button colorScheme="brand" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Text fontSize="lg" color="gray.600">Please log in to access your account.</Text>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  )
}

export default HomePage