import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await LeaderboardModel.find()
      .populate('topUsers.user', 'name')
      .populate('topTeams.team', 'name')
      .lean();

    res.json({
      resource: 'leaderboard',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'leaderboard',
      error: 'Failed to fetch leaderboard',
      details: error,
    });
  }
});

export default router;
