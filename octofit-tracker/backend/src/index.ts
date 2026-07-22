import express from 'express';
import db from './config/database';
import usersRouter from './api/users';
import teamsRouter from './api/teams';
import activitiesRouter from './api/activities';
import leaderboardRouter from './api/leaderboard';
import workoutsRouter from './api/workouts';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'octofit-tracker-backend',
    port: PORT,
    dbReadyState: db.readyState,
  });
});

app.listen(PORT, () => {
  console.log(`API running at ${baseUrl}`);
});
