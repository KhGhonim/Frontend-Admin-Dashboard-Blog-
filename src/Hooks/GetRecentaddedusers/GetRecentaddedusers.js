import { useState, useEffect } from "react";

const useFetchGetRecentaddedusers = () => {
  const [RecentUsers, setRecentUsers] = useState([]);
  const [RecentUserLoading, setRecentUserLoading] = useState(true);
  const [error, setError] = useState(null);
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecentUsers = async () => {
      setRecentUserLoading(true);
      setError(null);
      try {
        const  res = await fetch(`${apiUrl}/api/dashboard/recentUsers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch RecentUsers:", res.statusText);
        
        }

        const jsonRecentUsers = await res.json();
        setRecentUsers(jsonRecentUsers);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch RecentUsers:", err);
      } finally {
        setRecentUserLoading(false);
      }
    };

    fetchRecentUsers();
  }, [apiUrl]);

  return { RecentUsers, RecentUserLoading, error };
};

export default useFetchGetRecentaddedusers;