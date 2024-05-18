import { useLocation } from "react-router-dom";
import { Assignment } from "../../models/Assignment";
import { useEffect, useState } from "react";
import { Submission } from "../../models/Submission";
import Sidebar from "../../components/Lecturer/Sidebar";
import Header from "../../components/Header/Header";
import Topbar from "../../components/Admin/Topbar";

export default function SubmissionsFromAssignment(){
    const location = useLocation();
    const assignment: Assignment = location.state;

    //const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(
        () => {}, []
    );

    return(
        <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
            <Header title="Submissions" subtitle={`Submissions From ${assignment.title}`}/>
        </main>
        </div>
    );
}