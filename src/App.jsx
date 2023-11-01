import React, { useState, useEffect } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [likedPostsCount, setLikedPostsCount] = useState(0);

  // Load liked post IDs from localStorage when the app starts
  useEffect(() => {
    const storedLikedPostIds = localStorage.getItem("likedPostIds");
    if (storedLikedPostIds) {
      const parsedLikedPostIds = JSON.parse(storedLikedPostIds);
      setLikedPostIds(parsedLikedPostIds);
      setLikedPostsCount(parsedLikedPostIds.length);
    }
  }, []);

  // Callback function to add a new thought to the list and update likedPostsCount
  const addThought = (newThought) => {
    // Update the list of thoughts with the new thought
    setThoughts([newThought, ...thoughts]);

    // Check if the user hasn't liked this post before
    if (!likedPostIds.includes(newThought._id)) {
      // Increment the count of different posts liked by the user
      setLikedPostsCount(likedPostsCount + 1);

      // Add the liked post ID to the array
      setLikedPostIds([newThought._id, ...likedPostIds]);
    }
  };

  // Save liked post IDs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("likedPostIds", JSON.stringify(likedPostIds));
  }, [likedPostIds]);

  return (
    <div className="main-wrapper">
      <h1>Happy Thoughts</h1>
      <h2>Made by Daniel Bladh</h2>
      {/* Display the likedPostsCount element */}
      <div className="liked-posts-badge">
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        {likedPostsCount}
      </div>

      {/* Render the ThoughtForm component and pass the addThought callback */}
      <ThoughtForm onNewThought={addThought} />

      {/* Render the ThoughtList component and pass the list of thoughts */}
      <ThoughtList
        likedPostIds={likedPostIds}
        setLikedPostsCount={setLikedPostsCount}
        setLikedPostIds={setLikedPostIds}
      />
    </div>
  );
};
