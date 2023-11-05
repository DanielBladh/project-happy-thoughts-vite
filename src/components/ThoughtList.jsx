import React, { useState, useEffect } from "react";
import Thought from "./Thought";

export default function ThoughtList({
  thoughts,
  likedPostIds,
  setLikedPostsCount,
  setLikedPostIds,
  loading,
}) {
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
