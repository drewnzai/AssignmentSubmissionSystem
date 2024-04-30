import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import AdAuthService from "../../../services/AdAuth.service";
import AdminService from "../../../services/Admin.service";
import "./LecturerManagement.css";

export default function LecturerManagement(){
    const navigate = useNavigate();

    const admin = new AdminService();
    const auth = new AdAuthService();

    useEffect(() => {
        const user = auth.getCurrentUser();

        if(!user){
            navigate("/login");
        }
        
    }, []);

    const [lecturer, setLecturer] = useState({
        firstName: '',
        lastName: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLecturer({ ...lecturer, [name]: value });
    };

    const handleCreate = () => {
        admin.addLecturer(lecturer)
        .then(
            (response) => {
                toast.success("Lecturer Created Successfully");

                setLecturer({ firstName: '', lastName: '' }); 
            },
            (error) => {
                toast.error("Lecturer Not Created or Already Exists");
            }
        );
    };

    const handleDelete = () => {
        admin.deleteLecturer(lecturer)
        .then(
            (response) => {
                toast.success("Lecturer Deleted Successfully");

                setLecturer({ firstName: '', lastName: '' });
            },
            (error) => {
                toast.error("Lecturer Not Deleted or Does Not Exist");
            }
        );
    };

    return (
        <div className="lecturer-form">
            <input type="text" name="firstName" placeholder="First Name" value={lecturer.firstName} onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={lecturer.lastName} onChange={handleInputChange} />
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleDelete}>Delete</button>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}