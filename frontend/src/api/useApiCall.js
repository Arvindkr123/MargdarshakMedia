import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApiCall = () => {
    const [data, setData] = useState(null);    // Store response data
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);   // Track error state

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const res = await axios("http://localhost:4000/accounts");
                setData(res.data);   // Store the response data in state
            } catch (err) {
                setError(err.message);  // Set error if the request fails
            } finally {
                setLoading(false);      // Set loading to false after request completion
            }
        };

        fetchData();  // Call the fetch function
    }, []);  // Empty dependency array, so it runs once on component mount

    return { data, loading, error };  // Return states to be used in the component
};
