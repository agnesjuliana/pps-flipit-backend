/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

const router = express.Router();

import { FolderController } from '../controllers';
import { isAllowedRoles } from '../middleware';
import passport from '../strategy/jwt-strategy';

// use middleware
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  FolderController.createFolder,
);
router.get('/:id', FolderController.findFolderById);
router.get('/:id/flashcards', FolderController.getFolderFlashcards);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAllowedRoles(['ADMIN', 'USER']) as express.RequestHandler,
  FolderController.findFoldersByUserId,
);

export default router;
