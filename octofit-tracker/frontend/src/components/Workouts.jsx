import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

// Codespaces endpoint pattern: -8000.app.github.dev/api/workouts

function Workouts() {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0, baseUrl: '' });

  useEffect(() => {
    let mounted = true;

    fetchCollection('workouts')
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

  if (state.loading) return <p>Loading workouts...</p>;
  if (state.error) return <p className="text-danger">Workouts error: {state.error}</p>;

  return (
    <section>
      <h2>Workouts</h2>
      <p className="meta">Source: {state.baseUrl}/workouts/</p>
      <p className="meta">Total: {state.total}</p>
      <ul className="collection-list">
        {state.items.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.title}</strong>
            <span>{workout.difficulty}</span>
            <span>{workout.durationMinutes} minutes</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
