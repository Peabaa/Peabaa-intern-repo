/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  // Define the validation schema using Yup
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  // Initialize the useFormik hook
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(`Success! Name: ${values.name}, Email: ${values.email}`);
    },
  });

  // Render the form
  return (
    <div
      style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}
    >
      <h2>Sign Up Form</h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          gap: '10px',
        }}
      >
        {/* Name Field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g., Bob"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            style={{ width: '100%', padding: '5px' }}
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g., george@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            style={{ width: '100%', padding: '5px' }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
