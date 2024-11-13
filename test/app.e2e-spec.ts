import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ClientController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/clients (GET)', () => {
    return request(app.getHttpServer()) 
      .get('/clients')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('/clients (POST)', () => {
    return request(app.getHttpServer())
      .post('/clients')
      .send({ name: 'Test Client', salary: 5000, company: 'Test Corp' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: expect.any(Number),
          name: 'Test Client',
          salary: 5000,
          company: 'Test Corp',
        });
      });
  });
});
