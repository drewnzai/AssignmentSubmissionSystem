import {Box, IconButton, useTheme} from "@mui/material";
import {useContext} from "react";
import {ColorModeContext, tokens} from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


export default function Topbar(){
    const theme = useTheme();
    const colourMode = useContext(ColorModeContext);


    return(
        <Box display="flex" p={2}>
       
        <Box display="flex" >
          <IconButton onClick={colourMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
                <DarkModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    );
}