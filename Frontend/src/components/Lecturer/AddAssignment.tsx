import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Assignment } from "../../models/Assignment";
import {Formik} from "formik";
import * as yup from "yup";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Unit } from "../../models/Unit";
import LecturerService from "../../services/Lecturer.service";


const initialValues: Assignment = {
    title: "",
    lecturerEmail: "",
    description: "",
    unitCode: "",
    due: ""
}

const checkoutSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    unitCode: yup.string().required(),
    due: yup.string().required()
});



export default function AddAssignment(){
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const service = new LecturerService();


    const handleFormSubmit = (values: Assignment) => {
        values.lecturerEmail = service.getCurrentUserEmail();
        
        service.createAssignment(values);
    }

    const [units, setUnits] = useState<Unit[]>([]);
    
    useEffect(
        () => {
            service.getAssignedUnits()
            .then(
                (response: Unit[]) => {
                    setUnits(response);
                }
            )
        }, []
    );
    

    return(
        <Box m="20px">
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Assignment Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Assignment Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
              label="Unit Code"
              select
              name="unitCode"
              onChange={handleChange}
              >
                {units.map(
                (unit) => (
                  <MenuItem value={unit.code}>{unit.name}</MenuItem>
                )
            
            )}
              </TextField>
             
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                    label="Due Date"
                    disablePast 
                    onChange={(newValue) => {
                        //Due date will never be null
                        //@ts-ignore 
                        const date = newValue.toDate();
                        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                            .toString()
                            .padStart(2, '0')}/${date.getFullYear()}`;

                        values.due = formattedDate;

                        }}/>
                        
                </DemoContainer>
            </LocalizationProvider>


            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
                Create New Assignment
              </Button>
            </Box>
          </form>
        )}
      </Formik>
        </Box>
    );


}