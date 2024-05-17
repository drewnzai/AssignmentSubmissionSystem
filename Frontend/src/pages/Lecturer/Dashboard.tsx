import Header from "../../components/Header/Header";
import Sidebar from "../../components/Lecturer/Sidebar";

export default function LecturerDashboard(){
    return(
       
   
        <div className="app"> 
            <Sidebar/>
            <main className="content">
                <Header title="Dashboard" subtitle="Lecturer Home"/>
            </main>
            
            </div>
       
        
        );
}