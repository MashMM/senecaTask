import express from 'express';
import addCourseStats from '../handlers/addCourseStats';

const router = express.Router();

router.post('/courses/:courseId', addCourseStats);