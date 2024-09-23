import { getDatabase } from '../../src/database/database';

export async function clearCourseStats() {
  const db = await getDatabase();
  await db.run(`DELETE FROM CourseStats`);
  await db.close();
}

export default clearCourseStats;