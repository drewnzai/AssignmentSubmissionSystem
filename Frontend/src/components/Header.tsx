import {tokens} from "../theme";
import {Box, Typography, useTheme} from "@mui/material";

export default function Header({title, subtitle}: {title: string, subtitle:string}){
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    return(
        <Box m="20px">
        <Typography
          variant="h2"
          color={colours.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0"}}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colours.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
    );
}