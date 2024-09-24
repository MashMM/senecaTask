import { getDatabase } from "./database";
import selectCourseSessionStats from "./selectCourseSessionStats";

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

    const existingStats = await selectCourseSessionStats({ userId, courseId, sessionId });

    if (existingStats) {
      await db.run(
        `UPDATE CourseStats 
         SET totalModulesStudied = ?, averageScore = ?, timeStudied = ? 
         WHERE userId = ? AND courseId = ? AND sessionId = ?`,
        [totalModulesStudied, averageScore, timeStudied, userId, courseId, sessionId]
      );
      return { ok: true };
    }

    await db.run(
      `INSERT INTO CourseStats (userId, courseId, sessionId, totalModulesStudied, averageScore, timeStudied) 
         VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, courseId, sessionId, totalModulesStudied, averageScore, timeStudied]
    );
    return { ok: true }

  } catch (error) {
    console.error('error occured while inserting into database:', error);
    throw error;
  }
}

export default insertCourseStats;