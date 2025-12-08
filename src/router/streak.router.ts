/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

const router = express.Router();

import { StreakController } from '../controllers';
import { isAllowedRoles } from '../middleware';
import passport from '../strategy/jwt-strategy';

// use middleware
router.get(
  '/weekly',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  StreakController.getWeeklyStreaks,
);
router.get(
  '/monthly',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  StreakController.getMonthlyStreaks,
);

export default router;
