import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Assignment } from "../../models/Assignment";
import {Formik} from "formik";
import * as yup from "yup";
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Unit } from "../../models/Unit";
import LecturerService from "../../services/Lecturer.service";


const initialValues: Assignment = {
    title: "",
    lecturerEmail: "",
    description: "",
    unitCode: "",
    due: new Date
}

const checkoutSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    unitCode: yup.string().required()
});

const handleFormSubmit = (values: any) => {
    values
    console.log(values);
}

export default function AddAssignment(){
    const isNonMobile = useMediaQuery("(min-width:600px)");

    
    const service = new LecturerService();

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
             

            <InputLabel id="demo-simple-select-label">Unit Code</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.unitCode}
                label="Unit Code"
                name="unitCode"
                onChange={handleChange}
                >
              {units.map(
                (unit) => (
                  <MenuItem value={unit.code}>{unit.name}</MenuItem>
                )
            
            )}
              
            </Select>

              
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