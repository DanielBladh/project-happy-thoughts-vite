import React, { useState, useEffect } from "react";

export default function Thought({ thought, likedPostIds, setLikedPostsCount, setLikedPostIds }) {
  const [likes, setLikes] = useState(thought.hearts);

  const handleLikeClick = () => {
    // Send a POST request to like this thought
    fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thought._id}/like`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the local state with the updated like count
        setLikes(data.hearts);

        // Check if the user hasn't liked this post before
        if (!likedPostIds.includes(thought._id)) {
          // Increment the count of different posts liked by the user
          setLikedPostsCount((count) => count + 1);
        }

        // Add the thought's ID to the likedPostIds array
        setLikedPostIds([thought._id, ...likedPostIds]);
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

  return (
    <div className="thought">
      <p className="thought-message">{thought.message}</p>
      <div className="thought-likes">
        <div className="thought-info">
          <button onClick={handleLikeClick} className="like-button">
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
          </button>
          <span className="like-count">{likes}</span>
        </div>
        <div className="info-time">{timeAgo}</div>
      </div>
    </div>
  );
}
