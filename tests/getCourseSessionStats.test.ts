import request from 'supertest';
import testApp from './testApp';
import { getDatabase } from '../src/database/database';

describe('GET /courses/:courseId', () => {
  const userId: string = "Mashhood";
  const courseId: string = 'Chemistry';
  const sessionId: string[] = ['Atoms', 'Acids', 'Titrations'];
  const totalModulesStudied: number[] = [3, 8, 4];
  const averageScore: number[] = [7.5, 8.0, 9.0];
  const timeStudied: number[] = [2, 3, 6];

  beforeAll(async () => {
    const db = await getDatabase();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS CourseStats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        courseId TEXT NOT NULL,
        sessionId TEXT NOT NULL,
        totalModulesStudied INTEGER NOT NULL,
        averageScore REAL NOT NULL,
        timeStudied INTEGER NOT NULL
      );
    `);

    for (let i = 0; i < sessionId.length; i++) {
      await db.run(`
        INSERT INTO CourseStats (userId, courseId, sessionId, totalModulesStudied, averageScore, timeStudied) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, [userId, courseId, sessionId[i], totalModulesStudied[i], averageScore[i], timeStudied[i]]);
    }
  })

  it('should return 200 if session stats are found', async () => {

    const response = await request(testApp)
      .get(`/courses/${courseId}/sessions/${sessionId[0]}`)
      .set('X-User-Id', userId);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      sessionId: sessionId[0],
      totalModulesStudied: totalModulesStudied[0],
      averageScore: averageScore[0],
      timeStudied: timeStudied[0],
    });
  });

  it('should return 404 if courseId is missing', async () => {
    const response = await request(testApp)
      .get('/courses/')
      .set('X-User-Id', 'user-123');

    expect(response.status).toBe(404);
  });

  it('should return 404 if sessionId is missing', async () => {
    const response = await request(testApp)
      .get('/courses//${courseId}/sessions/')
      .set('X-User-Id', 'user-123');

    expect(response.status).toBe(404);
  });

  it('should return 404 if userId is missing', async () => {
    const response = await request(testApp)
      .get('/courses/${courseId}/sessions/${sessionId[0]}')

    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    const db = await getDatabase();
    await db.run(`DELETE FROM CourseStats`);
    await db.close();
  });

})