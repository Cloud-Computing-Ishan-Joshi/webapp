const request = require('supertest');
const app = require('../app');
const faker = require('faker');
const { fa } = require('faker/lib/locales');
require('dotenv').config();

describe('Healthz check endpoint', () => {
    test('should return 200 Status when database is connected', async() => {
        const response = await request(app).get('/healthz');
        expect(response.statusCode).toBe(200);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 400 Status code when request body is not empty', async() => {
        const request_body = {
            Status: "Body is not empty",
        };
        const response = await request(app).get('/healthz').send(request_body);
        expect(response.statusCode).toBe(400);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 400 Status code when request param is not empty', async() => {
        const response = await request(app).get('/healthz?param=notempty');
        expect(response.statusCode).toBe(400);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 404 Status when request path is invalid', async() => {
        const response = await request(app).get('/invalid');
        expect(response.statusCode).toBe(404);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

});


describe('User endpoint', () => {
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const username = faker.internet.email();
    const password = "test@12345";
    const updated_first_name = "Updated Test"
    const updated_last_name = "Updated User";

    test('should return 201 Status when user is created', async() => {
        const request_body = {
            "first_name": first_name,
            "last_name": last_name,
            "username": username,
            "password": password
        };
        try {
            const response = await request(app).post('/v1/user').send(request_body);
            expect(response.statusCode).toBe(201);
            expect(response.headers['cache-control']).toBe('no-cache');
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    test('should return 200 Status code and User', async() => {
        const basic_auth = {
            "username": username,
            "password": password
        };
        try {
            const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
            expect(response.statusCode).toBe(200);
            expect(response.headers['cache-control']).toBe('no-cache');
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    test('should return 401 Status code when user is not authenticated', async() => {
        try {
            const response = await request(app).get('/v1/user/self');
            expect(response.statusCode).toBe(401);
            expect(response.headers['cache-control']).toBe('no-cache');
        } catch (err) {
            console.log(err);
            throw err;
        }
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
        try {
            const response = await request(app).put('/v1/user/self').send(request_body).auth(basic_auth.username, basic_auth.password);
            expect(response.statusCode).toBe(204);
            expect(response.headers['cache-control']).toBe('no-cache');
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    test('should return 200 Status code and updated user after update', async() => {
        const basic_auth = {
            "username": username,
            "password": password
        };
        try {
            const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
            expect(response.statusCode).toBe(200);
            expect(response.headers['cache-control']).toBe('no-cache');
            expect(response.body.first_name).toBe(updated_first_name);
            expect(response.body.last_name).toBe(updated_last_name);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

});