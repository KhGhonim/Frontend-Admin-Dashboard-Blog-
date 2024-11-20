import { useState, useEffect } from "react";

const useFetchcomment = () => {
  const [comment, setcomment] = useState([]);
  const [commentloading, setcommentloading] = useState(true);
  const [error, setError] = useState(null);
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchcomment = async () => {
      setcommentloading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/api/dashboard/totalcomments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch comment:", res.statusText);
        
        }

        const jsoncomment = await res.json();
        setcomment(jsoncomment);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch comment:", err);
      } finally {
        setcommentloading(false);
      }
    };

    fetchcomment();
  }, [apiUrl]);

  return { comment, commentloading, error };
};

export default useFetchcomment;