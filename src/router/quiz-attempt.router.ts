/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

import { QuizAttemptController } from '../controllers';
import { isAllowedRoles } from '../middleware';
import passport from '../strategy/jwt-strategy';

const router = express.Router();

/* eslint-disable @typescript-eslint/unbound-method */
router.post(
  '/submit',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  QuizAttemptController.submitQuizResult,
);

router.get(
  '/weekly',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  QuizAttemptController.getWeeklyStats,
);

router.get(
  '/monthly',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  QuizAttemptController.getMonthlyStats,
);
/* eslint-enable @typescript-eslint/unbound-method */

export default router;
