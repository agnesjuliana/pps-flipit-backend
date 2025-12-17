// eslint-disable-next-line @typescript-eslint/no-misused-promises
import express from 'express';

import { UploadFileController } from '../controllers/upload-file.controller';
import { uploadFileMiddleware } from '../middleware/upload-file.middleware';

const router = express.Router();

router.post(
  '',
  uploadFileMiddleware.single('file') as any,
  (request, response, next) => {
    UploadFileController(request, response, next).catch(next);
  },
);

// eslint-disable-next-line import/no-default-export
export default router;
