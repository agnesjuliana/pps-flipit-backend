/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

import { LeaderboardController } from '../controllers';
import { isAllowedRoles } from '../middleware';
import passport from '../strategy/jwt-strategy';

const router = express.Router();

router.get('/top', LeaderboardController.getTopStreaks);

router.get(
  '/user-rank',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  LeaderboardController.getUserRank,
);

router.get(
  '/by-education',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  LeaderboardController.getTopStreaksByEducationLevel,
);

export default router;
