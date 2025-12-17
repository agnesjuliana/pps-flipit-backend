import express from 'express';

import { UploadImageController } from '../controllers/upload-image.controller';
import { uploadImageMiddleware } from '../middleware/upload-image.middleware';

const router = express.Router();

router.post(
  '',
  uploadImageMiddleware.single('file') as any,
  (request, response, next) => {
    UploadImageController(request, response, next).catch(next);
  },
);

// eslint-disable-next-line import/no-default-export
export default router;
