import React, { useState } from "react";
import API from "../../api/axios";

const SubmitComplaint = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/student/complaints", {
        subject,
        description,
      });

      alert("Complaint submitted successfully!");
      setSubject("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <div>
      <h3>Submit Complaint</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label><br />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Description:</label><br />
          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default SubmitComplaint;