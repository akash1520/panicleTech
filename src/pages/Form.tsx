import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { addUser } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface FormValues {
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  email: string;
  country: string;

}

const SignupSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  age: Yup.number()
    .required('Required')
    .positive('Age must be a positive number'),
  gender: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  country: Yup.string().required('Required'),

});


function getBirthDateFromAge(age: number): string {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear();
  const birthYear = currentYear - age;

  // Assuming birth date as 1st January of the birth year
  const birthDate = new Date(birthYear, currentDate.getMonth(), currentDate.getDate());

  return birthDate.toISOString().split('T')[0]; // Returns in "YYYY-MM-DD" format
}


const Form = () => {

  const user = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    first_name: '',
    last_name: '',
    age: 0,
    gender: '',
    email: '',
    country: '',
  };

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);

    const dob = getBirthDateFromAge(values.age)
    const createdBy = "user"
    dispatch(addUser({ ...values, dob, createdBy }));
    { console.log(user) }
    resetForm()
  };



  return (
    <>
      <Box sx={{
        display:"flex",
        mx: 'auto',
        my: '3rem',
        width: '80vw'
      }}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="first_name">
                {({ field }: any) => (
                  <TextField
                  sx={{my: '0.5rem'}}
                    label="First Name"
                    fullWidth
                    {...field}
                    error={Boolean(field?.error)}
                    helperText={<ErrorMessage name="first_name" />}
                  />
                )}
              </Field>
              <Field name="last_name">
                {({ field }: any) => (
                  <TextField
                  sx={{my: '0.5rem'}}
                    label="Last Name"
                    fullWidth
                    {...field}
                    error={Boolean(field?.error)}
                    helperText={<ErrorMessage name="last_name" />}
                  />
                )}
              </Field>
              <Field name="age">
                {({ field }: any) => (
                  <TextField
                    label="Age" 
                    sx={{my: '0.5rem'}}
                    type="number"
                    fullWidth
                    {...field}
                    error={Boolean(field?.error)}
                    helperText={<ErrorMessage name="age" />}
                  />
                )}
              </Field>
              <Field name="gender">
                {({ field }: any) => (
                  <FormControl fullWidth error={Boolean(field?.error)} sx={{my: '0.5rem'}}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      {...field}
                      fullWidth
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    <ErrorMessage name="gender" />
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field }: any) => (
                  <TextField
                  sx={{my: '0.5rem'}}
                    label="Email"
                    fullWidth
                    {...field}
                    error={Boolean(field?.error)}
                    helperText={<ErrorMessage name="email" />}
                  />
                )}
              </Field>
              <Field name="country">
                {({ field }: any) => (
                  <FormControl fullWidth error={Boolean(field?.error)} sx={{my: '0.5rem'}}>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                      labelId="country-label"
                      id="country"
                      {...field}
                      fullWidth
                    >
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <ErrorMessage name="country" />
                  </FormControl>
                )}
              </Field>
              <Button
                sx={{ my: "2rem"}}
                variant="outlined"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting === true ? "Submitting" : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Form;
