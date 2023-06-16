import {useState, useEffect} from "react";

const useFetch = (url, req) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTariffs = async () => {
            const response = await fetch(import.meta.env.VITE_API_FETCH + url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 422 || response.status === 401) {
                return response;
            }
            if (!response.ok) {
                setError(response.status);
                setLoading(false);
            }
            const resData = await response.json();
            setData(resData[req]);
            setLoading(false);
        };

        fetchTariffs();
    }, [req, url]);
    return [data, loading, error];
};

export default useFetch;
