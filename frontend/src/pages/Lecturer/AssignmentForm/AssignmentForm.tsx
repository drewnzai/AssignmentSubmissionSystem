import React, { useEffect, useState } from 'react';
import './AssignmentForm.css';
import LecUnitService from '../../../services/LecUnit.service';
import { Unit } from '../../../models/Unit';
import LecAuthService from '../../../services/LecAuth.service';

const formatDate = (date: Date): string => {
  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-indexed
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Utility function to parse dates
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const AssignmentForm = () => {
  const authService = new LecAuthService();
  const unitService = new LecUnitService();

  const [formData, setFormData] = useState({
    title: '',
    lecturerEmail: '',
    description: '',
    unitCode: '', // Default to the first dummy value
    due: new Date()
  });

  const [units, setUnits] = useState<Unit[]>([]);
  const lecturer = authService.getCurrentUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'due' ? new Date(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({...formData, lecturerEmail: lecturer.email})
    console.log(formData);
  };

  useEffect(() => {
    setUnits(unitService.getUnitsFromStorage());

  }, []);


  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="unitCode">Unit Code</label>
      <select
        id="unitCode"
        name="unitCode"
        value={formData.unitCode}
        onChange={handleChange}
      >
        {units.map((unit, index) => (
          <option key={unit.code} value={unit.code}>{unit.name}</option>
        ))}
      </select>

      <label htmlFor="due">Due Date</label>
      <input
        type="date"
        id="due"
        name="due"
        value={formatDate(formData.due)} // Convert the Date object to a string in 'dd/MM/yyyy' format
        onChange={handleChange}
        pattern="\d{2}/\d{2}/\d{4}"
        placeholder="DD/MM/YYYY"
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AssignmentForm;
