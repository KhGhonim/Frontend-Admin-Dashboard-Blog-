import { useState, useEffect } from "react";

const useFetchPosts = () => {
  const [Posts, setPosts] = useState([]);
  const [Postsloading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);
  // @ts-ignore
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/api/dashboard/totalPosts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch Posts:", res.statusText);
        }

        const jsonPosts = await res.json();
        setPosts(jsonPosts);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch Posts:", err);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  return { Posts, Postsloading, error };
};

export default useFetchPosts;
