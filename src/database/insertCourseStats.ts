import { getDatabase } from "./database";

type InsertCourseStatsProps = {
  userId: string;
  courseId: string;
  sessionId: string;
  totalModulesStudied: number;
  averageScore: number;
  timeStudied: number;
}

async function insertCourseStats({
  userId,
  courseId,
  sessionId,
  totalModulesStudied,
  averageScore,
  timeStudied
}: InsertCourseStatsProps) {
  try {
    const db = await getDatabase();

    await db.run(
      `INSERT INTO CourseStats (userId, courseId, sessionId, totalModulesStudied, averageScore, timeStudied) 
         VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, courseId, sessionId, totalModulesStudied, averageScore, timeStudied]
    );

    return { ok: true }
  } catch (error) {
    console.error('error occured while inserting into database:', error);
    return { ok: false }
  }
}

export default insertCourseStats;