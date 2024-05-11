import {Box, Button, InputLabel, MenuItem, Select, TextField, useMediaQuery} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import { StudentDto } from "../../models/StudentDto";
import AdminService from "../../services/Admin.service";
import { useEffect, useState } from "react";
import { Course } from "../../models/Course";

const registrationRegEx = new RegExp("[A-Z]|[A-Z]P\d{2}/\d{5}/\d{2}");

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    registration: yup.string()
    .matches(registrationRegEx, "Invalid Registration Number")
    .required("required")
});

const initialValues:StudentDto = {
  firstName: "",
  lastName: "",
  registration: "",
  courseName: ""
};

export default function DeleteStudent(){
    const isNonMobile = useMediaQuery("(min-width:600px)");

  const [courses, setCourses] = useState<Course[]>([]);
  
  const service =  new AdminService();
  
  const handleFormSubmit = (values: StudentDto) => {
        
        service.deleteStudent(values);
    };

    useEffect(
      () => {
        service.getCourses()
        .then(
          (response: Course[]) => {
            setCourses(response);
          }
        )
      }, [])

    
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Registration"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registration}
                name="registration"
                error={!!touched.registration && !!errors.registration}
                helperText={touched.registration && errors.registration}
                sx={{ gridColumn: "span 2" }}
              />

          <InputLabel id="demo-simple-select-label">Course Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.courseName}
              label="Age"
              name="courseName"
              onChange={handleChange}
            >
              {courses.map(
                (course) => (
                  <MenuItem value={course.name}>{course.name}</MenuItem>
                )
            
            )}
              
            </Select>
              
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button type="submit" sx={{
                color: "red"
            }} 
            variant="contained">
                Delete Student
              </Button>
            </Box>
          </form>
        )}
      </Formik>
        </Box>
    );
}