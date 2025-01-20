import React, { useEffect, useState } from "react";
import { Eye, Send, X, CheckCircle, XCircle, PencilLine } from "lucide-react";

const QuoteDetailsForm = () => {
  const [job_order_number, setjob_order_number] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [viewFileURL, setViewFileURL] = useState(null);
  const [token, settoken] = useState("");
  const [isFileViewed, setIsFileViewed] = useState(false); // Track if the file is viewed

  const statusOptions = [
    {
      value: "Approved",
      icon: CheckCircle,
      color: "emerald",
      bgColor: "bg-emerald-50",
      ringColor: "ring-emerald-500",
      textColor: "text-emerald-700",
      iconColor: "text-emerald-500",
    },
    {
      value: "Rejected",
      icon: XCircle,
      color: "red",
      bgColor: "bg-red-50",
      ringColor: "ring-red-500",
      textColor: "text-red-700",
      iconColor: "text-red-500",
    },
    {
      value: "Amended",
      icon: PencilLine,
      color: "blue",
      bgColor: "bg-blue-50",
      ringColor: "ring-blue-500",
      textColor: "text-blue-700",
      iconColor: "text-blue-500",
    },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setjob_order_number(urlParams.get("job_order_number") || "");
    settoken(urlParams.get("token") || "");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = { job_order_number, feedback, status };
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/quote/updateQuoteStatus/${job_order_number}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Move inside the headers object
          },
          body: JSON.stringify(data), // Send the data payload
        }
      );
  
      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFeedback(""); // Clear the feedback input
        setStatus(""); // Clear the status input
        setIsFileViewed(false); // Reset file viewed state
      } else {
        const errorData = await response.json(); // Parse the error response
        alert(`Failed to submit feedback. Error: ${errorData.message || "Unknown error"}`);
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
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          setViewFileURL(url);
          setIsFileViewed(true); // Enable form elements after viewing
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
    <div className="bg-gradient-to-br rounded-2xl from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quote Details
            </h1>
            <p className="text-gray-600">
              View the File and provide your feedback
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <button
                  onClick={handleView}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Eye className="w-4 h-4" />
                  View File
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Status
                </label>
                <div className="flex flex-wrap gap-4">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                        ${
                          status === option.value
                            ? `${option.bgColor} ring-2 ${option.ringColor} shadow-sm`
                            : "bg-white hover:bg-gray-50 border border-gray-200"
                        }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={status === option.value}
                        onChange={(e) => setStatus(e.target.value)}
                        className="hidden"
                        disabled={!isFileViewed} // Disable if file is not viewed
                      />
                      <option.icon
                        className={`w-5 h-5 
                          ${
                            status === option.value
                              ? option.iconColor
                              : "text-gray-400"
                          }`}
                      />
                      <span
                        className={`text-sm font-medium 
                          ${
                            status === option.value
                              ? option.textColor
                              : "text-gray-600"
                          }`}
                      >
                        {option.value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="4"
                  required
                  disabled={!isFileViewed} // Disable if file is not viewed
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Enter your feedback here..."
                />
              </div>

              <button
                type="submit"
                disabled={!isFileViewed} // Disable submit if file is not viewed
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-colors duration-200
                  ${
                    isFileViewed
                      ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                <Send className="w-4 h-4" />
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>

      {viewFileURL && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                File Viewer
              </h2>
              <button
                onClick={closePopup}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 min-h-0 p-4">
              <iframe
                src={viewFileURL}
                title="File Viewer"
                className="w-full h-[calc(100vh-100px)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-200px)] border rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteDetailsForm;
