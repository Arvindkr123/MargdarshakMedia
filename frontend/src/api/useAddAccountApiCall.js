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
      console.log(err.response.data.message)
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  return { addAccount, loading, error, data, setError };
};

export default useAddAccountApiCall;
