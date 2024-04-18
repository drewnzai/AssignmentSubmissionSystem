import { Grid } from "react-loader-spinner";

function Loader(){
    return(
        <div>
        <Grid 
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="13.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
  />            
        </div>
    );
}

export default Loader;