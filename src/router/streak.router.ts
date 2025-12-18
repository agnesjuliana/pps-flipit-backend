/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/unbound-method */
import express from 'express';

const router = express.Router();

import { StreakController } from '../controllers';
import { isAllowedRoles } from '../middleware';
import passport from '../strategy/jwt-strategy';

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  StreakController.getCurrentStreak,
);

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  StreakController.getAllStreaks,
);
/* eslint-enable @typescript-eslint/unbound-method */
/* eslint-enable @typescript-eslint/no-misused-promises */

export default router;
