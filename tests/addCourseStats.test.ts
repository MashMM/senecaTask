import request from 'supertest';
import testApp from './testApp'

describe('POST /courses/:courseId', () => {

  it('should return 404 if courseId is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(404);
  });

  it('should return 400 if userId is missing', async () => {
    const response = await request(testApp)
      .post(`/courses/1`)
      .send({ sessionId: 'session-id', totalModulesStudied: 5, averageScore: 80, timeStudied: 120000 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'userId required' });
  });
});
