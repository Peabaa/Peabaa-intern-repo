import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Gives us the .toBeInTheDocument() matcher
import axios from 'axios';
import UserList from './UserList.jsx';

// 1. Tell Jest to intercept all calls to the 'axios' library
jest.mock('axios');

describe('UserList Component', () => {
  it('displays a loading message initially', () => {
    // Mock a pending promise so the component gets stuck in the loading state
    axios.get.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('fetches and displays a list of users successfully', async () => {
    // 2. Create the exact fake data we want axios to return
    const fakeUsers = [
      { id: 1, name: 'Alice Focus' },
      { id: 2, name: 'Bob Bear' },
    ];

    // 3. Force axios to instantly return our fake data
    axios.get.mockResolvedValue({ data: fakeUsers });

    render(<UserList />);

    // 4. Wait for the asynchronous API call to finish and the DOM to update
    await waitFor(() => {
      const listItems = screen.getAllByTestId('user-item');
      expect(listItems).toHaveLength(2); // Did it render both users?
      expect(screen.getByText('Alice Focus')).toBeInTheDocument();
      expect(screen.getByText('Bob Bear')).toBeInTheDocument();
    });
  });

  it('displays an error message if the API call fails', async () => {
    // Simulate a 500 Internal Server Error or a network crash
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(<UserList />);

    // Wait for the component to catch the error and display the text
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
    });
  });
});
