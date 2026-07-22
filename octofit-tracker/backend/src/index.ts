import express from 'express';
import db from './config/database';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

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
