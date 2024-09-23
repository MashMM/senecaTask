import { Request, Response } from 'express';
import selectCourseStats from '../database/selectCourseStats';

const getCourseStats = async (req: Request, res: Response) => {

  const { courseId } = req.params;
  const userId = req.header('X-User-Id');

  if (!userId) return res.status(400).send({ message: 'userId required' });
  if (typeof userId !== 'string') return res.status(400).send({ message: 'invalid userId' });

  const result = await selectCourseStats({
    userId,
    courseId,
  });

  res.status(200).send(result)
}

export default getCourseStats;