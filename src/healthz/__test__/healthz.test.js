const request = require('supertest');
const app = require('../../app');
require('dotenv').config();

describe('Healthz check endpoint', () => {
    test('should return 200 Status when database is connected', async() => {
        // jest.spyOn(require('../../database/db'), 'authenticate').mockResolvedValueOnce();
        // jest.spyOn(require('../../database/db'), 'sync').mockResolvedValueOnce();
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