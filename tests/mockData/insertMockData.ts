import { getDatabase } from '../../src/database/database';

export const mockData = {
  userId: "Alice",
  courseId: "Maths",
  sessionId: ['Addition', 'Subtraction', 'Multiplication'],
  totalModulesStudied: [3, 8, 4],
  averageScore: [7.5, 8.0, 9.0],
  timeStudied: [2, 3, 6],
};

export async function insertMockData() {
  const db = await getDatabase();


  for (let i = 0; i < mockData.sessionId.length; i++) {
    await db.run(`
      INSERT INTO CourseStats (userId, courseId, sessionId, totalModulesStudied, averageScore, timeStudied) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [mockData.userId, mockData.courseId, mockData.sessionId[i], mockData.totalModulesStudied[i], mockData.averageScore[i], mockData.timeStudied[i]]);
  }
}

export default insertMockData;