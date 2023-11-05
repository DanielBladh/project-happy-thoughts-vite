import React, { useState, useEffect } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [likedPostsCount, setLikedPostsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Callback function to add a new thought to the list and update likedPostsCount
  const addThought = (newThought) => {
    // Update the list of thoughts with the new thought
    setThoughts([newThought, ...thoughts]);
  };

  // Load liked post IDs from localStorage when the app starts
  useEffect(() => {
    const storedLikedPostIds = localStorage.getItem("likedPostIds");
    if (storedLikedPostIds) {
      const parsedLikedPostIds = JSON.parse(storedLikedPostIds);
      setLikedPostIds(parsedLikedPostIds);
      setLikedPostsCount(parsedLikedPostIds.length);
    }
  }, []);

  // Save liked post IDs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("likedPostIds", JSON.stringify(likedPostIds));
  }, [likedPostIds]);

  useEffect(() => {
    fetchThoughts();
  }, []);

  const fetchThoughts = () => {
    setLoading(true);
    setTimeout(() => {
      fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
        .then((response) => response.json())
        .then((data) => {
          // Update the thoughts state with the data from the API response
          setThoughts(data);
          console.log(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading status to false after fetching data (whether successful or not)
        });
    }, 500); // Add half a second delay here
  };

  return (
    <div className="main-wrapper">
      <h1>Happy Thoughts</h1>
      <h2>Made by Daniel Bladh</h2>
      {/* Display the likedPostsCount element */}
      <div className="liked-posts-badge">
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        {likedPostsCount} liked posts
      </div>

      {/* Render the ThoughtForm component and pass the addThought callback */}
      <ThoughtForm onNewThought={addThought} />

      {/* Render the ThoughtList component and pass the list of thoughts */}
      <ThoughtList
        thoughts={thoughts}
        likedPostIds={likedPostIds}
        setLikedPostsCount={setLikedPostsCount}
        setLikedPostIds={setLikedPostIds}
        loading={loading}
      />
    </div>
  );
};
