/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

const router = express.Router();

import { PlayController } from '../controllers';
import { isAllowedRoles, validate } from '../middleware';
import passport from '../strategy/jwt-strategy';
import { createPlayResultValidation } from '../validators';

// use middleware
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  PlayController.createPlay,
);
router.post(
  '/:id/result',
  validate(createPlayResultValidation),
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  PlayController.createPlayResult,
);
router.post(
  '/:id/finish',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  PlayController.finishPlay,
);

export default router;
