import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AssignmentForm.css';
import LecUnitService from '../../../services/LecUnit.service';
import {Unit} from '../../../models/Unit';
import LecAuthService from '../../../services/LecAuth.service';
import {format} from 'date-fns';
import LecAssignmentService from '../../../services/LecAssignment.service';
import {useNavigate} from 'react-router-dom';


const AssignmentForm = () => {

  const navigate = useNavigate();

  const authService = new LecAuthService();
  const unitService = new LecUnitService();
  const lecturer = authService.getCurrentUser();
  const assignmentService = new LecAssignmentService();

  const [formData, setFormData] = useState({
    title: '',
    lecturerEmail: lecturer.email,
    description: '',
    unitCode: '', // Default to the first dummy value
    due: new Date()
  });

  const [units, setUnits] = useState<Unit[]>([]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      due: date
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = format(formData.due, 'dd/MM/yyyy');
    console.log({...formData, due: formattedDate});

    assignmentService.addAssignment({...formData, due: formattedDate})
    .then(
      (response) => {
        alert("Assignment is created");
        navigate("/lecturerDashboard");
      }
      ,(error) => {

      alert("The assignment already exists or the inputs are invalid");

      }
    );
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
      <DatePicker
        selected={formData.due}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        wrapperClassName="date-picker"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AssignmentForm;
