const request = require('supertest');
const app = require('../../app');
const faker = require('faker');
const db = require('../../database/db');

beforeAll(async() => {
    await db.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    await db.sync({ alter: true }).then(() => {
        console.log('Database synchronized successfully');
    }).catch(err => {
        console.log('Error synchronizing database');
    });
});

beforeEach(async() => {
    jest.resetModules();
});

const first_name = String(faker.name.firstName());
const last_name = String(faker.name.lastName());
const username = String(faker.internet.email());
const password = "test@12345";
const updated_first_name = String(faker.name.firstName());
const updated_last_name = String(faker.name.lastName());


describe('User endpoint', () => {
    test('should return 201 Status when user is created', async() => {
        const request_body = {
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "password": password
        };
        const response = await request(app).post('/v1/user').send(request_body);
        expect(response.statusCode).toBe(201);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 200 Status code and User', async() => {
        const basic_auth = {
            "username": username,
            "password": password
        };
        const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
        expect(response.statusCode).toBe(200);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 401 Status code when user is not authenticated', async() => {
        const response = await request(app).get('/v1/user/self');
        expect(response.statusCode).toBe(401);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 204 Status code when user is updated', async() => {
        const basic_auth = {
            "username": username,
            "password": password
        };
        const request_body = {
            "first_name": updated_first_name,
            "last_name": updated_last_name,
        };
        const response = await request(app).put('/v1/user/self').send(request_body).auth(basic_auth.username, basic_auth.password);
        expect(response.statusCode).toBe(204);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 200 Status code and updated user after update', async() => {
        const basic_auth = {
            "username": username,
            "password": password
        };
        const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
        expect(response.statusCode).toBe(200);
        expect(response.headers['cache-control']).toBe('no-cache');
        expect(response.body.first_name).toBe(updated_first_name);
        expect(response.body.last_name).toBe(updated_last_name);
    });

    afterEach(async() => {
        jest.restoreAllMocks();
    });

    afterAll(async() => {
        await db.close();
    });

});