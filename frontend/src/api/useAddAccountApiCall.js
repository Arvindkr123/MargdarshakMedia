import { useState } from 'react';
import axios from 'axios';

const useAddAccountApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const addAccount = async (inputData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:4000/accounts', inputData);
      setData(response.data);
    } catch (err) {
      setError('Failed to add account');
    } finally {
      setLoading(false);
    }
  };

  return { addAccount, loading, error, data };
};

export default useAddAccountApiCall;
