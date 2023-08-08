import request from 'supertest';
import { app } from '@/app';
import {
  afterAll, beforeAll, describe, expect, it,
} from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'A new gym',
        phone: '85999999999',
        latitude: 10,
        longitude: 10,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'A new gym',
        phone: '85999999999',
        latitude: 10,
        longitude: 10,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        q: 'JavaScript',
      })
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' }),
    ]);
  });
});
