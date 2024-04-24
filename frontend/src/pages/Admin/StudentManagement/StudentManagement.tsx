import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Student from "../../Student/StudentDetails/Student";
import { StudentDetails } from "../../../models/StudentDetails";
import AdSidebar from "../../../components/Sidebar/AdSidebar";
import AdminService from "../../../services/Admin.service";
import AdAuthService from "../../../services/AdAuth.service";
import { useNavigate } from "react-router-dom";
import "./StudentManagement.css"

export default function StudentManagement(){
    const navigate = useNavigate();

    const admin = new AdminService();
    const auth = new AdAuthService();

    useEffect(() => {
        const user = auth.getCurrentUser();

        if(!user){
            navigate("/login");
        }
        
    }, []);
    
    const [student, setNewStudent] = useState<StudentDetails>({
        fullName: "",
        registration: "",
        courseName: ""
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewStudent((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleCreate = () => {
        // Perform validation
        if (!student.fullName || !student.registration || !student.courseName) {
          toast.error("Please fill out all fields.");
          return;
        }
        
        admin.addStudent(student)
        .then(
            (response) => {
                toast.success("Student created successfully.");        
            },
            (error) => {
                toast.error("Student not created");
            }
        )
        // Success
        
        setNewStudent({
          fullName: "",
          registration: "",
          courseName: ""
        });
      };
    
      const handleDelete = () => {
        admin.deleteStudent(student)
        .then(
            (response) => {
                toast.success("Student deleted successfully.");
            },
            (error) => {
                toast.error("Student not deleted or does not exist");
            }
        )
        
        setNewStudent({
          fullName: "",
          registration: "",
          courseName: ""
        });
      };
    
      return (

        <div>
            <AdSidebar/>
        
        <div className="object-container">
          <h2>Create Student</h2>
          <div className="object-form">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={student.fullName}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="registration">Registration:</label>
            <input
              type="text"
              id="registration"
              name="registration"
              value={student.registration}
              onChange={handleChange}
              pattern="[A-Z]?P?/\d{2}/\d{5}/\d{2}"
              required
            />
    
            <label htmlFor="courseName">Course Name:</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={student.courseName}
              onChange={handleChange}
              required
            />
    
            <button type="button" onClick={handleCreate}>Create</button>
            <button type="button" onClick={handleDelete}>Delete</button>
          </div>
          </div>
          <ToastContainer />
        </div>
      );
}