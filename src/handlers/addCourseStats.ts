import { Request, Response } from 'express';
import insertCourseStats from '../database/insertCourseStats';

const addCourseStats = async (req: Request, res: Response) => {

  const { courseId } = req.params;
  const userId = req.header('X-User-Id');
  const {
    sessionId,
    totalModulesStudied,
    averageScore,
    timeStudied,
  } = req.body ?? {};

  if (!userId) return res.status(400).send({ message: 'userId required' });
  if (typeof userId !== 'string') return res.status(400).send({ message: 'invalid userId' });

  if (!sessionId) return res.status(400).send({ message: 'sessionId required' });
  if (typeof sessionId !== 'string') return res.status(400).send({ message: 'invalid sessionId' });

  if (!totalModulesStudied) return res.status(400).send({ message: 'totalModulesStudied required' });
  if (typeof totalModulesStudied !== 'number' || totalModulesStudied < 0) return res.status(400).send({ message: 'invalid totalModulesStudied' });

  if (!averageScore) return res.status(400).send({ message: 'averageScore required' });
  if (typeof averageScore !== 'number') return res.status(400).send({ message: 'invalid averageScore' });

  if (!timeStudied) return res.status(400).send({ message: 'timeStudied required' });
  if (typeof timeStudied !== 'number' || timeStudied < 0) return res.status(400).send({ message: 'invalid timeStudied' });

  const result = await insertCourseStats({
    userId,
    courseId,
    sessionId,
    totalModulesStudied,
    averageScore,
    timeStudied
  });

  if (result) {
    res.status(201).send({ message: 'OK' });
  } else {
    res.status(500).send({ message: 'internal server error' });
  }
}

export default addCourseStats;