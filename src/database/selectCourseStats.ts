import { getDatabase } from "./database";

type GetCourseStatsProps = {
  userId: string;
  courseId: string;
}

async function selectCourseStats({
  userId,
  courseId,
}: GetCourseStatsProps) {
  try {
    const db = await getDatabase();

    const result = await db.get(
      `SELECT 
                SUM(totalModulesStudied) AS totalModulesStudied,
                AVG(averageScore) AS averageScore,
                SUM(timeStudied) AS timeStudied
            FROM CourseStats 
            WHERE userId = ? AND courseId = ?;`,
      [userId, courseId]
    );

    if (!result || result.totalModulesStudied === null || result.averageScore === null || result.timeStudied === null) {
      return undefined;
    }
    return result;

  } catch (error) {
    console.error('error occured while getting course stats from database:', error);
    throw error;
  }
}

export default selectCourseStats;