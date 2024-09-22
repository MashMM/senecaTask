import express from 'express';
import addCourseStats from '../handlers/addCourseStats';
import getCourseStats from '../handlers/getCourseStats';
import getCourseSessionStats from '../handlers/getCourseSessionStats';

const router = express.Router();

router.post('/courses/:courseId', addCourseStats);
router.get('/courses/:courseId', getCourseStats);

router.get('/courses/:courseId/sessions/:sessionId', getCourseSessionStats);

export default router;