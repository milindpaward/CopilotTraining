import { Router } from 'express';
import TeamModel from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await TeamModel.find().populate('members', 'name email').lean();

    res.json({
      resource: 'teams',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'teams',
      error: 'Failed to fetch teams',
      details: error,
    });
  }
});

export default router;
