import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Teams() {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0, baseUrl: '' });

  useEffect(() => {
    let mounted = true;

    fetchCollection('teams')
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

  if (state.loading) return <p>Loading teams...</p>;
  if (state.error) return <p className="text-danger">Teams error: {state.error}</p>;

  return (
    <section>
      <h2>Teams</h2>
      <p className="meta">Source: {state.baseUrl}/teams/</p>
      <p className="meta">Total: {state.total}</p>
      <ul className="collection-list">
        {state.items.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong>
            <span>{team.city}</span>
            <span>Points: {team.points}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
