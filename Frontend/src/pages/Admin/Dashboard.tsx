import Sidebar from "../../components/Admin/Sidebar";
import Topbar from "../../components/Admin/Topbar";
import Header from "../../components/Header/Header";

export default function Dashboard(){
    

    return(
       
   
    <div className="app"> 
        <Sidebar/>
        <main className="content">
            <Topbar/>
            <Header title="Dashboard" subtitle="Display Application Properties"/>
        </main>
        
        </div>
   
    
    );
}