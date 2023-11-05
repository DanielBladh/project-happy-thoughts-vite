import React, { useState, useEffect } from "react";

export default function ThoughtForm({ onNewThought }) {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCharCount(message.length);
  }, [message]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    setError(null); // Clear any previous error when user types.
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.length < 5 || message.length > 140) {
      setError("Message must be between 5 and 140 characters.");
      return;
    }

    // Send a POST request to create a new thought
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((newThought) => {
        // Pass the new thought to the parent component
        onNewThought(newThought);

        // Clear the input field and reset character count
        setMessage("");
        setCharCount(0);
        setSubmitted(true);
      })
      .catch((error) => {});
  };

  return (
    <div className={`thought-form ${submitted ? "bounce-in" : ""}`}>
      <h2>What is making you happy right now?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Share your happy thought..."
          value={message}
          onChange={handleInputChange}
        ></textarea>
        <div className="char-count">
          <div className="error-container">
            {error && <p className="error-message">{error}😔</p>}
          </div>
          <div className="char-count-content">
            <span
              id="length"
              className={`${charCount > 140 ? "text-red" : ""}`}
            >
              {charCount}/140
            </span>
          </div>
        </div>
        <button className="post-button" type="submit">
          ❤️Send Happy Thought!❤️
        </button>
      </form>
    </div>
  );
}
