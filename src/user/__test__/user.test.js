const request = require('supertest');
const app = require('../../app');
const faker = require('faker');

beforeEach(async() => {
    jest.resetModules();
});

first_name = faker.name.firstName();
last_name = faker.name.lastName();
username = faker.internet.email();
password = "test@12345";

describe('User endpoint', () => {
    test('should return 200 Status when user is created', async() => {
        const request_body = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password
        };
        const response = await request(app).post('/v1/user').send(request_body);
        expect(response.statusCode).toBe(201);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 200 Status code and User', async() => {
        const basic_auth = {
            username: username,
            password: password
        };
        const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
        expect(response.statusCode).toBe(200);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    test('should return 204 Status code when user is updated', async() => {
        const basic_auth = {
            username: username,
            password: password
        };
        const request_body = {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
        };
        const response = await request(app).put('/v1/user/self').send(request_body).auth(basic_auth.username, basic_auth.password);
        expect(response.statusCode).toBe(204);
        expect(response.headers['cache-control']).toBe('no-cache');
    });

    afterEach(async() => {
        jest.restoreAllMocks();
    });

});