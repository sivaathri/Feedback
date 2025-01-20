import React, { useEffect, useState } from "react";

const QuoteDetailsForm = () => {
  const [job_order_number, setjob_order_number] = useState("");
  const [feedback, setFeedback] = useState("");
  const [viewFileURL, setViewFileURL] = useState(null);

  const apiToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM3MzU1MzY2LCJleHAiOjE3MzczOTg1NjZ9.MsdlNnFtsMnzphOan-bo9id7qSrdvfY5GlBXWmzxak4";

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

  const handleView = () => {
    fetch(`http://localhost:3000/api/quote/view-file/${job_order_number}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          setViewFileURL(url); // Set the file URL to display in the popup
        } else {
          alert("Failed to fetch the file.");
        }
      })
      .catch((error) => {
        console.error("Error fetching file:", error);
        alert("An error occurred while viewing the file.");
      });
  };

  const closePopup = () => {
    setViewFileURL(null);
    window.URL.revokeObjectURL(viewFileURL);
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
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          padding: "30px",
          width: "90%",
          maxWidth: "600px",
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
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>
            <strong>Job Order Number:</strong>{" "}
            {job_order_number || "Not provided"}
          </p>
          <p>Click below to view the attached file:</p>
        </div>
        <h1>hello</h1>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
          onClick={handleView}
          style={{
            borderRadius: "12px",
            background: "linear-gradient(45deg, #6a11cb, #2575fc)",
            padding: "12px 24px",
            fontSize: "16px",
            transition: "transform 0.2s ease, background 0.3s ease",
          }}
        >
          View File
        </button>

        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          <label
            htmlFor="feedback"
            style={{
              display: "block",
              marginBottom: "10px",
              color: "#fff",
              fontWeight: "600",
              fontSize: "16px",
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
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          ></textarea>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
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

      {/* Popup for file viewing */}
      {viewFileURL && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl transition-transform transform-gpu ease-in-out duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">File Viewer</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-red-600 focus:outline-none transition duration-200"
              >
                ✖
              </button>
            </div>
            <iframe
              src={viewFileURL}
              title="File Viewer"
              className="w-full h-[calc(100vh-100px)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-200px)] border rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteDetailsForm;
