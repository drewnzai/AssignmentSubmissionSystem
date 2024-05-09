import useTheme from "@mui/material/styles/useTheme";
import {tokens} from "../../theme.ts";
import * as yup from "yup";
import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import Typography from "@mui/material/Typography";

export default function StudentLogin(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const registrationRegEx = new RegExp("[A-Z]|[A-Z]P\d{2}/\d{5}/\d{2}");

    const checkoutSchema = yup.object().shape({
        password: yup.string().required("required"),
        registration: yup.string()
            .matches(registrationRegEx, "Invalid Registration Number")
            .required("required")

    });

    const initialValues = {
        registration: "",
        password: ""
    };

    const handleFormSubmit = (values: any) => {
        console.log(values);
    };

    return(
        <Box>
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
                            mt={"200px"}
                            display="block"
                            gap="30px"
                            p={"10px"}
                            sx={{
                                alignItems: "center",
                                justifyContent: "center"

                            }}

                        >
                            <Typography
                                variant="h2"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "0 0 5px 0"}}
                            >
                                Student Login
                            </Typography>
                            <Box width={"100%"}>
                                <TextField
                                    sx={{
                                        borderRadius: "4px"
                                    }}
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

                                />
                            </Box>


                            <br/>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}

                            />


                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">

                            <Button type="submit" color="secondary" variant="contained">
                                Login
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}