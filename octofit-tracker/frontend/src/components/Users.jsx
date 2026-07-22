import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

// Codespaces endpoint pattern: -8000.app.github.dev/api/users

function Users() {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0, baseUrl: '' });

  useEffect(() => {
    let mounted = true;

    fetchCollection('users')
      .then(({ items, total, baseUrl }) => {
        if (!mounted) return;
        setState({ loading: false, error: '', items, total, baseUrl });
      })
      .catch((error) => {
        if (!mounted) return;
        setState({ loading: false, error: error.message, items: [], total: 0, baseUrl: '' });
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (state.loading) return <p>Loading users...</p>;
  if (state.error) return <p className="text-danger">Users error: {state.error}</p>;

  return (
    <section>
      <h2>Users</h2>
      <p className="meta">Source: {state.baseUrl}/users/</p>
      <p className="meta">Total: {state.total}</p>
      <ul className="collection-list">
        {state.items.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
            <span>Level: {user.fitnessLevel}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
