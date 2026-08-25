import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://web-production-2f6b.up.railway.app';

export const apiCall = async (endpoint, options = {}) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'حدث خطأ ما في الاتصال');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};