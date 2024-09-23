import request from 'supertest';
import testApp from './testApp';
import { getDatabase } from '../src/database/database';
import insertMockData, { mockData } from './mockData/insertMockData';
import clearCourseStats from './mockData/clearMockData';

describe('GET /courses/:courseId', () => {

  beforeAll(async () => {
    await insertMockData();
  })

  it('should return 200 if course stats are found', async () => {
    // Calculate expected values
    const expectedModulesStudied = mockData.totalModulesStudied.reduce((sum, value) => sum + value, 0);
    const expectedScore = mockData.averageScore.reduce((sum, value) => sum + value, 0) / mockData.averageScore.length;
    const expectedTimeStudied = mockData.timeStudied.reduce((sum, value) => sum + value, 0);

    const response = await request(testApp)
      .get(`/courses/${mockData.courseId}`)
      .set('X-User-Id', mockData.userId);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalModulesStudied: expectedModulesStudied,
      averageScore: expectedScore,
      timeStudied: expectedTimeStudied,
    });
  });

  it('should return 404 if courseId is missing', async () => {
    const response = await request(testApp)
      .get('/courses/')
      .set('X-User-Id', 'user-123');

    expect(response.status).toBe(404);
  });

  it('should return 400 if userId is missing', async () => {
    const response = await request(testApp)
      .get('/courses/Maths')

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'userId required' });
  });

  afterAll(async () => {
    clearCourseStats();
  });

})