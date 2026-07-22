import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

// Codespaces endpoint pattern: -8000.app.github.dev/api/leaderboard

function Leaderboard() {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0, baseUrl: '' });

  useEffect(() => {
    let mounted = true;

    fetchCollection('leaderboard')
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

  if (state.loading) return <p>Loading leaderboard...</p>;
  if (state.error) return <p className="text-danger">Leaderboard error: {state.error}</p>;

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="meta">Source: {state.baseUrl}/leaderboard/</p>
      <p className="meta">Total: {state.total}</p>
      <ul className="collection-list">
        {state.items.map((entry) => (
          <li key={entry._id}>
            <strong>{entry.period}</strong>
            <span>Top users: {entry.topUsers?.length ?? 0}</span>
            <span>Top teams: {entry.topTeams?.length ?? 0}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Leaderboard;
