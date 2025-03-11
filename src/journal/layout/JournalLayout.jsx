import { Box } from "@mui/material"
import { NavBar, SideBar } from "../components";


const drawerWidth = 240;
// eslint-disable-next-line react/prop-types
export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn" >

           <NavBar  />

           <SideBar drawerWidth={ drawerWidth } />
            

            <Box  component={'main'} sx={{flexGrow: 1, p: 10}}>{ children }</Box>
        </Box>
    )
}