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
