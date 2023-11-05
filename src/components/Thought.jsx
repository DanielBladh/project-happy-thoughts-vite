import React, { useState, useEffect } from "react";

export default function Thought({
  thought,
  likedPostIds,
  setLikedPostsCount,
  setLikedPostIds,
  className,
}) {
  const [likes, setLikes] = useState(thought.hearts);
  const thoughtId = thought._id;
  const isLiked = likedPostIds.includes(thoughtId);

  const handleLikeClick = () => {
    // Send a POST request to like this thought
    fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thoughtId}/like`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the local state with the updated like count
        setLikes(data.hearts);

        // Check if the user hasn't liked this post before
        if (!likedPostIds.includes(thoughtId)) {
          // Increment the count of different posts liked by the user
          setLikedPostsCount((count) => count + 1);

          // Add the thought's ID to the likedPostIds array
          setLikedPostIds((ids) => [thoughtId, ...ids]);

          // Store liked post IDs in local storage
          localStorage.setItem(
            "likedPostIds",
            JSON.stringify([thoughtId, ...ids])
          );
        }
      })
      .catch((error) => {
        // Handle error, if needed
        console.log("Error:", error);
      });
  };

  // Format the creation date and time
  const createdAt = new Date(thought.createdAt);
  const timeAgo = formatTimeDifference(createdAt);

  // Function to format the time difference between the creation time and now
  function formatTimeDifference(createdAt) {
    const now = new Date();
    const timeDifference = Math.floor((now - createdAt) / 1000); // in seconds

    if (timeDifference < 60) {
      return `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)} minutes ago`;
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)} hours ago`;
    } else {
      return `${Math.floor(timeDifference / 86400)} days ago`;
    }
  }

  useEffect(() => {
    // Load liked post IDs from local storage when the component mounts
    const storedLikedPostIds = localStorage.getItem("likedPostIds");
    if (storedLikedPostIds) {
      const parsedLikedPostIds = JSON.parse(storedLikedPostIds);
      setLikedPostIds(parsedLikedPostIds);
      setLikedPostsCount(parsedLikedPostIds.length);
    }
  }, [setLikedPostIds, setLikedPostsCount]);

  return (
    <div className={`thought ${className}`}>
      <p className="thought-message">{thought.message}</p>
      <div className={`thought-likes ${isLiked ? "liked" : ""}`}>
        <div className="thought-info">
          <button
            onClick={handleLikeClick}
            className={`like-button ${
              isLiked ? "liked-button" : "not-liked-button"
            }`}
          >
            {isLiked ? (
              <span role="img" aria-label="heart">
                ❤️
              </span>
            ) : (
              <span role="img" aria-label="heart">
                🤍
              </span>
            )}
          </button>
          <span className="like-count">{likes}</span>
        </div>
        <div className="info-time">{timeAgo}</div>
      </div>
    </div>
  );
}
