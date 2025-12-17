/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

const router = express.Router();

import { FlashcardController } from '../controllers';
import { validate, isAllowedRoles } from '../middleware';
import { uploadFileMiddleware } from '../middleware/upload-file.middleware';
import passport from '../strategy/jwt-strategy';
import { createFlashcardValidation } from '../validators';

router.post(
  '/generate',
  uploadFileMiddleware.single('file') as any,
  FlashcardController.generateFlashcard,
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  validate(createFlashcardValidation),
  FlashcardController.createFlashcard,
);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  FlashcardController.getFlashcardByUserId,
);
router.get(
  '/:id/items',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  FlashcardController.getFlashcardItemByFlashcardId,
);

export default router;
