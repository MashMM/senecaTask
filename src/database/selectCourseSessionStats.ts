import { getDatabase } from "./database";

type GetCourseSessionStatsProps = {
  userId: string;
  courseId: string;
  sessionId: string;
}

async function selectCourseSessionStats({
  userId,
  courseId,
  sessionId
}: GetCourseSessionStatsProps) {
  try {
    const db = await getDatabase();

    const result = await db.get(
      `SELECT sessionId, totalModulesStudied, averageScore, timeStudied FROM CourseStats 
             WHERE userId = ? AND courseId = ? AND sessionId = ?`,
      [userId, courseId, sessionId]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export default selectCourseSessionStats;