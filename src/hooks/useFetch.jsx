import {useState, useEffect} from "react";

const useFetch = (url, req, useToken) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let header = {};
        if (useToken === true) {
            header = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("adACto")}`,
            };
        } else {
            header = {
                "Content-Type": "application/json",
            };
        }
        const fetchTariffs = async () => {
            const response = await fetch(import.meta.env.VITE_API_FETCH_ACTIVE + url, {
                method: "GET",
                headers: header,
            });
            if (response.status === 422 || response.status === 401) {
                return response;
            }
            if (!response.ok) {
                setError(response.message);
                setLoading(false);
            }
            const resData = await response.json();
            setData(resData[req]);
            setLoading(false);
        };

        fetchTariffs();
    }, [req, url, useToken]);
    return [data, loading, error];
};

export default useFetch;
