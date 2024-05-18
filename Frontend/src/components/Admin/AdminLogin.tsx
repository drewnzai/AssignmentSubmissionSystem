import {Box, Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Formik} from "formik";
import * as yup from "yup";
import useTheme from "@mui/material/styles/useTheme";
import {tokens} from "../../theme.ts";
import AdminService from "../../services/Admin.service.ts";
import {LoginRequest} from "../../models/LoginRequest.ts";
import {useNavigate} from "react-router-dom";

export default function AdminLogin(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const service = new AdminService();

    const checkoutSchema = yup.object().shape({
        password: yup.string().required("required"),
        email: yup.string()
            .email("Enter valid email address")
            .required("required")

    });

    const initialValues:LoginRequest = {
        email: "",
        password: ""
    };

    const handleFormSubmit = (values: LoginRequest) => {
        service.login(values)
        .then(
            (_response) => {
                navigate("/admin/home");
            }
        )
        
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
                                Administrator Login
                            </Typography>
                            <Box width={"100%"}>
                                <TextField
                                    sx={{
                                        borderRadius: "4px"
                                    }}
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

                                />
                            </Box>


                            <br/>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
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