import React, { useState } from 'react';
import './AssignmentForm.css';

const AssignmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    lecturerEmail: '',
    description: '',
    unitCode: 'CS301', // Default to the first dummy value
    due: ''
  });

  const unitCodes = [
    { code: 'CS301', name: 'Database Management Systems' },
    { code: 'CS501', name: 'Operating Systems' },
    // Add more unit codes as needed
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the submission of the form data
    console.log(formData);
  };

  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <label htmlFor="unitCode">Unit Code</label>
      <select
        id="unitCode"
        name="unitCode"
        value={formData.unitCode}
        onChange={handleChange}
      >
        {unitCodes.map((unit) => (
          <option key={unit.code} value={unit.code}>{unit.name}</option>
        ))}
      </select>

      <label htmlFor="due">Due Date</label>
      <input
        type="date"
        id="due"
        name="due"
        value={formData.due}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AssignmentForm;
