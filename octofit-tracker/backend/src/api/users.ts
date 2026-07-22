import { Router } from 'express';
import UserModel from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const items = await UserModel.find().populate('team', 'name city').lean();

    res.json({
      resource: 'users',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      resource: 'users',
      error: 'Failed to fetch users',
      details: error,
    });
  }
});

export default router;
