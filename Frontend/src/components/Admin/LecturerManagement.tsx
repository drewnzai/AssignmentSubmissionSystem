import {Box, Button, TextField, useMediaQuery} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";

const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    email: yup.string()
    .email("Enter valid email address")
    .required("required"),
    
  });

const initialValues = {
    fullName: "",
    email: ""
  };

export default function LecturerManagement(){

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
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
            <Button type="submit" sx={{backgroundColor: "red"}} variant="contained">
                Delete Lecturer
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Create New Lecturer
              </Button>
            </Box>
          </form>
        )}
      </Formik>
        </Box>
    );
}