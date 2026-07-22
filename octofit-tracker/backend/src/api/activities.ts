import { Router } from 'express';
import ActivityModel from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await ActivityModel.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean();

    res.json({
      resource: 'activities',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'activities',
      error: 'Failed to fetch activities',
      details: error,
    });
  }
});

export default router;
