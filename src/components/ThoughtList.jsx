import React, { useState, useEffect } from "react";
import Thought from "./Thought";

export default function ThoughtList({
  likedPostIds,
  setLikedPostsCount,
  setLikedPostIds,
}) {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading status indicator

  useEffect(() => {
    setLoading(true); // Set loading status to true before fetching data

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
    }, 500); // Add a 2-second delay here lol
  }, []); 

  return (
    <>
      {loading ? (
        <div className="loading">
          <div>Loading...</div>
          <div className="spinner" />
        </div>
      ) : (
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
      )}
    </>
  );
}
