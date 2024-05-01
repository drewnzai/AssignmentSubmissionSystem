import {useEffect, useState} from "react";
import AdAuthService from "../../../services/Admin/AdAuth.service";
import {useNavigate} from "react-router-dom";
import AdSidebar from "../../../components/Sidebar/AdSidebar";
import "./Dashboard.css";
import Loader from "../../../components/Loader/Loader";
import AdminService from "../../../services/Admin/Admin.service";
import {SystemDetails} from "../../../models/SystemDetails";
import {Bar, Line} from "react-chartjs-2";

function AdDashboard(){
    const authService = new AdAuthService();
    const admin = new AdminService();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<SystemDetails>
    ({studentNumber: 0, lecturerNumber: 0, assignmentNumber: 0, submissionNumber: 0});
  
    
    useEffect(() => {
      const currentUser: any | null = authService.getCurrentUser();
      
      if(!currentUser){
        navigate("/login");
      }
      setTimeout(
        () => {
        admin.getSystemDetails()
        .then(
          (response: SystemDetails) => {
            setDetails(response);
            setLoading(false);
          }
        );
        }
      , 3000);

    }, [navigate]);

    if(loading){
      return(
        <div className="container">
          <Loader/>
        </div>
      );
    }

    const data = {
      labels: ['Students', 'Lecturers', 'Assignments', 'Submissions'],
      datasets: [
          {
              label: 'Count',
              data: [details.studentNumber, details.lecturerNumber, details.assignmentNumber, details.submissionNumber],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
          }
      ],
  };

  const options = {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  };

  return (
        <div>
        <AdSidebar/>
        <div className="chart-container">
          <Bar data={data} options={options} />
          <Line data={data} options={options} />
      </div>
        </div>
      );
    
}

export default AdDashboard;