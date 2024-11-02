import { useState, useEffect } from 'react';
import { getUser } from "@/src/services/user/userServices";
import { TUser } from "@/src/types/user";

const useFetchUser = () => {
  const [user, setUser] = useState<{ fullName: string }>({ fullName: '' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      if (result.success && result.data) {
        const userData = result.data as TUser;
        setUser(userData);
        setSelectedImage(userData.photo?.path ?? null); 
      } else {
        setError(result.message || "Error al obtener datos de usuario");
      }
    };
  
    fetchUser();
  }, []);

  return { user, selectedImage, error };
};

export default useFetchUser;
