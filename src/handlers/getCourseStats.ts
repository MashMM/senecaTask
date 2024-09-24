import { Request, Response } from 'express';
import selectCourseStats from '../database/selectCourseStats';

type CourseStatsResponse = {
  totalModulesStudied: Number;
  averageScore: Number;
  timeStudied: Number;
}

const getCourseStats = async (req: Request, res: Response) => {

  const { courseId } = req.params;
  const userId = req.header('X-User-Id');

  if (!userId) return res.status(400).send({ message: 'userId required' });
  if (typeof userId !== 'string') return res.status(400).send({ message: 'invalid userId' });

  const result = await selectCourseStats({
    userId,
    courseId,
  });

  if (result) {
    const courseStatsResponse: CourseStatsResponse = {
      totalModulesStudied: result.totalModulesStudied,
      averageScore: result.averageScore,
      timeStudied: result.timeStudied,
    }
    res.status(200).send(courseStatsResponse);
    return;
  }
  res.status(404).send({ message: 'no stats found' });
}

export default getCourseStats;