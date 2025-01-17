import React, { useEffect, useState } from "react";

const QuoteDetailsForm = () => {
  const [job_order_number, setjob_order_number] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  // Extract URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setjob_order_number(urlParams.get("job_order_number") || "");
    setEmail(urlParams.get("email") || "");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      job_order_number: job_order_number,
      feedback,
      email,
    };

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFeedback(""); // Clear the feedback field
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1>Quote Details</h1>
      <p>Fill out the form below to provide feedback or additional information.</p>

      {/* Display email */}
      <p>
        <strong>job_order_number:</strong> {job_order_number || "Not provided"}
      </p>

      <p>
        <strong>Email:</strong> {email || "Not provided"}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <label htmlFor="jobOrder">Job Order Number:</label>
        <input type="text" id="jobOrder" value={job_order_number} readOnly />

        <label htmlFor="feedback">Your Feedback:</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          required
        ></textarea>

        <button type="submit" style={{ marginTop: "16px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuoteDetailsForm;