import {Box, Button, TextField, useMediaQuery} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import { StudentDto } from "../../models/StudentDto";
import { useState } from "react";

const registrationRegEx = new RegExp("[A-Z]|[A-Z]P\d{2}/\d{5}/\d{2}");

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    registration: yup.string()
    .matches(registrationRegEx, "Invalid Registration Number")
    .required("required"),
    courseName: yup.string().required("required")
});



export default function StudentManagement(){
  const [student, setStudent] = useState<StudentDto>({
  firstName: "",
  lastName: "",
  registration: "",
  courseName: ""
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");
    
    const handleFormSubmit = (values: StudentDto) => {
        setStudent(values);

        console.log(values);
    };


    return(
        <Box m="20px">
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={student}
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

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Course Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.courseName}
                name="courseName"
                error={!!touched.courseName && !!errors.courseName}
                helperText={touched.courseName && errors.courseName}
                sx={{ gridColumn: "span 2" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
                Create New Student
              </Button>
            </Box>
          </form>
        )}
      </Formik>
        </Box>
    );
}