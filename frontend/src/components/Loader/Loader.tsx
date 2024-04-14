import { ClimbingBoxLoader } from "react-spinners";


function Loader(){
    return(
        <div>
            <ClimbingBoxLoader loading={true} color="rgba(12, 237, 41, 1)" />
        </div>
    );
}

export default Loader;