import {Box, Button, TextField, useMediaQuery} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";

const registrationRegEx = new RegExp("[A-Z]|[A-Z]P\d{2}/\d{5}/\d{2}");

const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    registration: yup.string()
    .matches(registrationRegEx, "Invalid Registration Number")
    .required("required"),
    
  });

const initialValues = {
    fullName: "",
    registration: ""
  };

export default function StudentManagement(){
    const isNonMobile = useMediaQuery("(min-width:600px)");
    
    const handleFormSubmit = (values: any) => {
        console.log(values);
    };


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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
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
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button type="submit" sx={{backgroundColor: "red"}} variant="contained">
                Delete Student
              </Button>
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