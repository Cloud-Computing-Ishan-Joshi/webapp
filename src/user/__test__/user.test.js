const request = require('supertest');
const app = require('../../app');
const User = require('../../user/model/user');
const client = require('../../database/client');

// jest.setTimeout(30000);
client.connect({ database: process.env.DB_NAME_ORIG });

beforeAll(async() => {
    await client.query(`CREATE DATABASE ${process.env.DB_NAME_TEST} WITH OWNER ${process.env.DB_USER}`);
    process.env.DB_NAME = process.env.DB_NAME_TEST;
});

beforeEach(async() => {
    jest.resetModules();
});

describe('User endpoint', () => {
    test('should return 200 Status when user is created', async() => {
        const request_body = {
            first_name: "test",
            last_name: "user",
            username: "test1@gmail.com",
            password: "test@12345"
        };
        const response = await request(app).post('/v1/user').send(request_body);
        expect(response.statusCode).toBe(201);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 200 Status code and User', async() => {
        const basic_auth = {
            username: 'test@gamil.com',
            password: 'test@12345'
        };
        const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
        expect(response.statusCode).toBe(200);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 204 Status code when user is updated', async() => {
        const basic_auth = {
            username: 'test@gmail.com',
            password: 'test@12345'
        };
        const request_body = {
            first_name: "test_updated",
            last_name: "user_updated"
        };
        const response = await request(app).put('/v1/user/self').send(request_body).auth(basic_auth.username, basic_auth.password);
        expect(response.statusCode).toBe(204);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    afterEach(async() => {
        jest.restoreAllMocks();
    });

    afterAll(async() => {
        // await client.connect({ database: process.env.DB_NAME_ORIG });
        await client.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME_TEST}`);
        await client.end();
    });

});