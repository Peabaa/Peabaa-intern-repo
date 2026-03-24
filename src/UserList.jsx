import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // We ping a real, free testing API
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 border rounded shadow-md mt-4 max-w-sm">
      <h2 className="text-xl font-bold mb-4">User Directory</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          // We add a data-testid here to make it super easy for Jest to find these!
          <li key={user.id} data-testid="user-item">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
