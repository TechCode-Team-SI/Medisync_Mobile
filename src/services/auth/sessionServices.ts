import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async (): Promise<string | null> => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    const userSession = session ? JSON.parse(session) : null;
    return userSession?.token ?? null;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
};

export const saveSession = async (sessionData: { token: string; refreshToken: string; tokenExpires: string; user: any }): Promise<void> => {
    try {
      await AsyncStorage.setItem('userSession', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error al guardar la sesión:', error);
    }
  };

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const session = await AsyncStorage.getItem('userSession');
    const userSession = session ? JSON.parse(session) : null;
    return userSession?.refreshToken || null;
  } catch (error) {
    console.error('Error al obtener el refresh token:', error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('userSession');
  } catch (error) {
    console.error('Error al limpiar la sesión:', error);
  }
};
