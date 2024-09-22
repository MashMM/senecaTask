import express from 'express';
import addCourseStats from '../handlers/addCourseStats';
import getCourseStats from '../handlers/getCourseStats';

const router = express.Router();

router.post('/courses/:courseId', addCourseStats);
router.get('/courses/:courseId', getCourseStats);

export default router;