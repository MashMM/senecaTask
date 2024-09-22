import { Request, Response } from 'express';
import selectCourseSessionStats from '../database/selectCourseSessionStats';

const getCourseSessionStats = async (req: Request, res: Response) => {

  const { courseId, sessionId } = req.params;
  const userId = req.header('X-User-Id');

  if (!courseId) return res.status(400).send({ message: 'courseId required' });
  if (!userId) return res.status(400).send({ message: 'userId required' });
  if (!sessionId) return res.status(400).send({ message: 'sessionId required' });


  if (typeof userId !== 'string') return res.status(400).send({ message: 'invalid userId' });

  const result = await selectCourseSessionStats({
    userId,
    courseId,
    sessionId
  });

  res.status(200).send(result);
}

export default getCourseSessionStats;