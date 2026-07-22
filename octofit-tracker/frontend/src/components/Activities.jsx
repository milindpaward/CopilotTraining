import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

// Codespaces endpoint pattern: -8000.app.github.dev/api/activities

function Activities() {
  const [state, setState] = useState({ loading: true, error: '', items: [], total: 0, baseUrl: '' });

  useEffect(() => {
    let mounted = true;

    fetchCollection('activities')
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

  if (state.loading) return <p>Loading activities...</p>;
  if (state.error) return <p className="text-danger">Activities error: {state.error}</p>;

  return (
    <section>
      <h2>Activities</h2>
      <p className="meta">Source: {state.baseUrl}/activities/</p>
      <p className="meta">Total: {state.total}</p>
      <ul className="collection-list">
        {state.items.map((activity) => (
          <li key={activity._id}>
            <strong>{activity.type}</strong>
            <span>{activity.durationMinutes} minutes</span>
            <span>{activity.caloriesBurned} kcal</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
