import express from 'express';
const router = express.Router();

import AuthRoutes from './auth.router';
import QuizAttemptRoutes from './quiz-attempt.router';
import StreakRoutes from './streak.router';

router.use('/auth', AuthRoutes);
router.use('/streak', StreakRoutes);
router.use('/quiz', QuizAttemptRoutes);

// eslint-disable-next-line import/no-default-export
export default router;
