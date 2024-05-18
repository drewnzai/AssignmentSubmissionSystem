import Header from "../../components/Header/Header";
import Sidebar from "../../components/Lecturer/Sidebar";

export default function Submissions(){
    return(
        <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Header title="Submissions" subtitle="Submissions From All Students"/>
        </main>
        </div>
    );
}