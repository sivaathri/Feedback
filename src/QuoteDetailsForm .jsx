import React, { useEffect, useState } from "react";

const QuoteDetailsForm = () => {
  const [jobOrder, setJobOrder] = useState("");
  const [feedback, setFeedback] = useState("");

  // Extract URL parameters and populate job order number
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobOrderParam = urlParams.get("job_order");
    if (jobOrderParam) {
      setJobOrder(jobOrderParam);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      job_order: jobOrder,
      feedback,
    };

    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFeedback(""); // Clear feedback after successful submission
      } else {
        alert("Failed to submit feedback. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1>Quote Details</h1>
      <p>
        Fill out the form below to provide feedback or additional information.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <label
          htmlFor="jobOrder"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Job :
        </label>
        <input
          type="text"
          id="jobOrder"
          value={jobOrder}
          readOnly
          style={{
            width: "100%",
            marginBottom: "16px",
            padding: "8px",
          }}
        />

        <label
          htmlFor="feedback"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Your :
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          required
          style={{
            width: "100%",
            marginBottom: "16px",
            padding: "8px",
          }}
        ></textarea>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuoteDetailsForm;
