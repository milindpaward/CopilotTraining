import { Router } from 'express';
import WorkoutModel from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await WorkoutModel.find().populate('createdBy', 'name email').lean();

    res.json({
      resource: 'workouts',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'workouts',
      error: 'Failed to fetch workouts',
      details: error,
    });
  }
});

export default router;
