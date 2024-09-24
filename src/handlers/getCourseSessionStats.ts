import { Request, Response } from 'express';
import selectCourseSessionStats from '../database/selectCourseSessionStats';

type CourseSessionStatsResponse = {
  sessionId: string;
  totalModulesStudied: Number;
  averageScore: Number;
  timeStudied: Number;
}

const getCourseSessionStats = async (req: Request, res: Response) => {

  const { courseId, sessionId } = req.params;
  const userId = req.header('X-User-Id');

  if (!userId) return res.status(400).send({ message: 'userId required' });

  if (typeof userId !== 'string') return res.status(400).send({ message: 'invalid userId' });

  const result = await selectCourseSessionStats({
    userId,
    courseId,
    sessionId
  });

  if (result) {
    const courseSessionStatsResponse: CourseSessionStatsResponse = {
      sessionId: result.sessionId,
      totalModulesStudied: result.totalModulesStudied,
      averageScore: result.averageScore,
      timeStudied: result.timeStudied
    }
    res.status(200).send(courseSessionStatsResponse);
    return;
  }
  res.status(404).send({ message: 'no stats found' });
}

export default getCourseSessionStats;