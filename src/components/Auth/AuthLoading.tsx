import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getToken } from '@/src/services/auth/sessionServices';

const AuthLoading: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        router.replace('/homeuser'); 
      } else {
        router.replace('/home'); 
      }
    };

    checkToken();
  }, [router]);

  return null; 
};

export default AuthLoading;
