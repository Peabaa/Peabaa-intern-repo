# Reflection

## Code Examples

### **RegistrationForm.jsx**

```jsx
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
```

### **RegistrationForm.test.jsx:** Since there is no React bundle that will allow this to work, I ran a Jest test to check the functionality of the Formik and Yup implementation

```jsx
/* eslint-env jest */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm Component', () => {
  // We need to mock 'alert' and 'console.log' before each test
  // so they don't actually trigger and clutter the terminal or crash the test environment.
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display error messages if the form is submitted empty', async () => {
    render(<RegistrationForm />);

    // Find the submit button and click it without typing anything
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Because Formik validates asynchronously, we use waitFor() to pause
    // the test until the error messages actually render on the screen.
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should display an error if the email format is invalid', async () => {
    render(<RegistrationForm />);

    const emailInput = screen.getByLabelText(/email/i);

    // Type an invalid email and click away (blur) to trigger validation
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('should successfully submit the form when valid inputs are provided', async () => {
    render(<RegistrationForm />);

    // Find the input fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out the form correctly
    fireEvent.change(nameInput, { target: { value: 'Bob' } });
    fireEvent.change(emailInput, { target: { value: 'george@example.com' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for Formik to validate and call the onSubmit function,
    // which should trigger our mocked window.alert
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Success! Name: Bob, Email: george@example.com',
      );
    });
  });
});
```

### How does Formik simplify form management compared to handling state manually?

Handling form state manually in React requires writing a massive amount of boilerplate code. For every single input field, you have to create individual useState hooks, write custom onChange functions to update that state, track whether a user has clicked into a field (onBlur), and manually bundle all those states together when the user clicks submit. Formik simplifies this by centralizing everything into a single useFormik hook. It automatically tracks the state of all values, errors, and visited fields behind the scenes. You simply pass formik.handleChange and formik.values to your inputs, and Formik handles the rest.

### What are the benefits of using Formik’s validation instead of writing validation logic manually?

Writing manual validation logic usually results in messy, hard-to-read code filled with endless if/else statements and complex Regex patterns (like manually checking if an email string contains an '@' symbol). Formik, especially when paired with a schema library like Yup, allows you to define your validation rules declaratively. You just state the rules (e.g., `Yup.string().email().required()`), and Formik automatically runs the checks. Furthermore, Formik tracks the touched state of each input. This prevents the frustrating user experience of showing an error message before the user has even finished typing, ensuring errors only display after the user clicks away from an invalid field.
