import express from 'express';
const router = express.Router();

import passport from '../strategy/jwt-strategy';
import AuthRoutes from './auth.router';
import FlashcardRoutes from './flashcard.router';
import FolderRoutes from './folder.router';
import PlayRoutes from './play.router';
import SendFileRoutes from './send-file.router';
import SendImageRoutes from './send-image.router';
import StreakRoutes from './streak.router';
import UploadFileRoutes from './upload-file.router';
import UploadImageRoutes from './upload-image.router';

router.use('/auth', AuthRoutes);
router.use('/folder', FolderRoutes);
router.use('/flashcard', FlashcardRoutes);
router.use('/play', PlayRoutes);
router.use('/upload-file', UploadFileRoutes);
router.use('/upload-image', UploadImageRoutes);
router.use('/image', SendImageRoutes);
router.use('/file', SendFileRoutes);
router.use('/streak', StreakRoutes);

router.use(
  '/upload-file',
  passport.authenticate('jwt', { session: false }),
  UploadFileRoutes,
);
router.use(
  '/upload-image',
  passport.authenticate('jwt', { session: false }),
  UploadImageRoutes,
);

// eslint-disable-next-line import/no-default-export
export default router;
