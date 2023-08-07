import request from 'supertest';
import { app } from '@/app';
import {
  afterAll, beforeAll, describe, expect, it,
} from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser';
import { prisma } from '@/lib/prisma';

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'A new gym',
        phone: '85999999999',
        latitude: 10,
        longitude: 10,
      },
    });

    const response = await request(app.server)
      .post(`/check-ins/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 10,
        longitude: 10,
      });

    expect(response.statusCode).toBe(201);
  });
});
