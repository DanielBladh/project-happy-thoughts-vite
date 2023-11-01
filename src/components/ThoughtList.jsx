import React, { useState, useEffect } from "react";
import Thought from "./Thought";

export default function ThoughtList({
  likedPostIds,
  setLikedPostsCount,
  setLikedPostIds,
}) {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((response) => response.json())
      .then((data) => {
        // Update the thoughts state with the data from the API response
        setThoughts(data);
        console.log(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts.

  return (
    <div className="thought-list">
      {thoughts.map((thought) => (
        <Thought
          key={thought._id}
          thought={thought}
          likedPostIds={likedPostIds}
          setLikedPostsCount={setLikedPostsCount}
          setLikedPostIds={setLikedPostIds}
        />
      ))}
    </div>
  );
}
