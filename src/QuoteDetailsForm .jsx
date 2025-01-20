import React, { useEffect, useState } from "react";

const QuoteDetailsForm = () => {
  const [job_order_number, setjob_order_number] = useState("");
  const [feedback, setFeedback] = useState("");
  const [file, setFile] = useState("");
  // const [email, setEmail] = useState("");

  // Extract URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setjob_order_number(urlParams.get("job_order_number") || "");
  
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      job_order_number: job_order_number,
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
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4facfe, #00f2fe)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          padding: "30px",
          width: "90%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>Quote Details</h1>
        <p style={{ color: "#f0f0f0", marginBottom: "30px" }}>
          Fill out the form below to provide feedback or additional information.
        </p>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          <p>
            <strong>Job Order Number:</strong>{" "}
            {job_order_number || "Not provided"}
          </p>
        
        </div>
        {file && (
        <div>
          <p>Click below to view the attached file:</p>
          <a href={`http://localhost:3000//quote/view-file/${job_order_number}`} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="feedback"
            style={{
              display: "block",
              marginBottom: "10px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              background: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          ></textarea>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #5b86e5, #36d1dc)",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s ease, background 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteDetailsForm;
