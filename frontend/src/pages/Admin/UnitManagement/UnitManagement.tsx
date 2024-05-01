import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import AdAuthService from "../../../services/Admin/AdAuth.service";
import AdminService from "../../../services/Admin/Admin.service";
import "./UnitManagement.css";

export default function UnitManagement(){
    const navigate = useNavigate();

    const admin = new AdminService();
    const auth = new AdAuthService();

    useEffect(() => {
        const user = auth.getCurrentUser();

        if(!user){
            navigate("/login");
        }
        
    }, []);

    const [unit, setUnit] = useState({
        name: '',
        description: '',
        code: '',
        credits: 0,
        semester: '',
        lecturerEmail: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUnit({ ...unit, [name]: value });
    };

    const handleCreate = () => {
        admin.addUnit(unit)
        .then(
            (response) => {
                toast.success("Unit Created Successfully");

                setUnit({
                    name: '',
                    description: '',
                    code: '',
                    credits: 0,
                    semester: '',
                    lecturerEmail: '',
                });
            },
            (error) => {
                toast.error("Unit Not Created or Already Exists");
            }
        );
    };

    const handleDelete = () => {
        admin.deleteUnit(unit)
        .then(
            (response) => {
                toast.success("Unit Deleted Successfully");

                setUnit({
                    name: '',
                    description: '',
                    code: '',
                    credits: 0,
                    semester: '',
                    lecturerEmail: '',
                });
            },
            (error) => {
                toast.error("Unit Not Deleted or Does Not Exist");
            }
        );
    };

    return (
        <div className="unit-form">
            <input type="text" name="name" placeholder="Name" value={unit.name} onChange={handleInputChange} />
            <input type="text" name="description" placeholder="Description" value={unit.description} onChange={handleInputChange} />
            <input type="text" name="code" placeholder="Code" value={unit.code} onChange={handleInputChange} />
            <input type="number" name="credits" placeholder="Credits" value={unit.credits} onChange={handleInputChange} />
            <input type="text" name="semester" placeholder="Semester" value={unit.semester} onChange={handleInputChange} />
            <input type="text" name="lecturerEmail" placeholder="Lecturer Email" value={unit.lecturerEmail} onChange={handleInputChange} />
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleDelete}>Delete</button>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}