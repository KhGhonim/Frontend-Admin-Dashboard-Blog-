import { useState, useEffect } from "react";

const useFetchGetRecentaddedcomments = () => {
  const [GetRecentaddedcomments, setGetRecentaddedcomments] = useState([]);
  const [GetRecentaddedcommentsloading, setGetRecentaddedcommentsLoading] = useState(true);
  const [error, setError] = useState(null);
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchGetRecentaddedcomments = async () => {
      setGetRecentaddedcommentsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/api/dashboard/recentcomments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch GetRecentaddedcomments:", res.statusText);
        }

        const jsonGetRecentaddedcomments = await res.json();
        setGetRecentaddedcomments(jsonGetRecentaddedcomments);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch GetRecentaddedcomments:", err);
      } finally {
        setGetRecentaddedcommentsLoading(false);
      }
    };

    fetchGetRecentaddedcomments();
  }, [apiUrl]);

  return { GetRecentaddedcomments, GetRecentaddedcommentsloading, error };
};

export default useFetchGetRecentaddedcomments;