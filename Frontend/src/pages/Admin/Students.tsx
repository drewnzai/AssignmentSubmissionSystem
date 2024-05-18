import {Box, useTheme} from "@mui/material";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Admin/Sidebar";
import Topbar from "../../components/Admin/Topbar";
import {tokens} from "../../theme";
import {useEffect, useState} from "react";
import {StudentDetails} from "../../models/StudentDetails";
import AdminService from "../../services/Admin.service";


export default function Students(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const service = new AdminService();

    const [students, setStudents] = useState<StudentDetails[]>([]);

    const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID"
    },
        {
            field: "fullName",
            headerName: "Full Name",
            flex: 1
            
        },
        {
            field: "registration",
            headerName: "Registration Number",
            flex: 1
            
        },
        {
            field: "courseName",
            headerName: "Course Name",
            flex: 1
           
        }

    ]
    
    useEffect(
      () => {
        service.getStudents()
        .then(
          (response: StudentDetails[]) => {
            setStudents(response);
          }
        )
      }, []
    );

    return(
        <>
        <div className="app">
            <Sidebar/>
        <main className="content">
            <Topbar/>
            <Header title="Student Details" subtitle="Student Management"/>
            <Box m="40px 0 0 0" height={"69vh"}
            sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
            <DataGrid
            pageSizeOptions={[5]}   
            rows={students}
            columns={columns}
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
            />
            </Box>
        </main>
            
            </div>
        
        </>
    );
}