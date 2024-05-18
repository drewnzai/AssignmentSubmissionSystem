import { useLocation } from "react-router-dom";
import { Unit } from "../../models/Unit";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Lecturer/Sidebar";

export default function Assignments(){
    const location = useLocation();
    const unit: Unit = location.state;

    return(
        <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Header title="Dashboard" subtitle="Lecturer Home"/>
            {unit.code}
        </main>
        </div>
    );
}