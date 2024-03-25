// const request = require('supertest');
// const app = require('../../app');
// const faker = require('faker');

// const first_name = faker.name.firstName();
// const last_name = faker.name.lastName();
// const username = faker.internet.email();
// const password = "test@12345";
// const first_name_update = faker.name.firstName();
// const last_name_update = faker.name.lastName();
// let response_post;

// describe('User endpoint', () => {
//     test('should return 201 Status when user is created', async() => {
//         const request_body = {
//             first_name: first_name,
//             last_name: last_name,
//             username: username,
//             password: password
//         };
//         try {
//             response = await request(app).post('/v1/user').send(request_body);
//             expect(response.statusCode).toBe(201);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 200 Status code and User', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
//             response_post = response;
//             expect(response.statusCode).toBe(200);
//             expect(response.body.first_name).toBe(first_name);
//             expect(response.body.last_name).toBe(last_name);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 403 Status code when user is not verified', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(403);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 204 Status code when user is verified', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get(`/v1/user/verify/${response_post.body.token}`).auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(204);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }); 

//     test('should return 204 Status code when user is updated', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         const request_body = {
//             first_name: first_name_update,
//             last_name: last_name_update
//         };
//         try {
//             const response = await request(app).put('/v1/user/self').send(request_body).auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(204);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 200 Status code and User after Update', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(200);
//             expect(response.body.first_name).not.toBe(first_name_update);
//             expect(response.body.last_name).not.toBe(last_name_update);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });
// });
// const request = require('supertest');
// const app = require('../../app');
// const faker = require('faker');

// const first_name = faker.name.firstName();
// const last_name = faker.name.lastName();
// const username = faker.internet.email();
// const password = "test@12345";
// const first_name_update = faker.name.firstName();
// const last_name_update = faker.name.lastName();
// let response_post;

// describe('User endpoint', () => {
//     test('should return 201 Status when user is created', async() => {
//         const request_body = {
//             first_name: first_name,
//             last_name: last_name,
//             username: username,
//             password: password
//         };
//         try {
//             response = await request(app).post('/v1/user').send(request_body);
//             expect(response.statusCode).toBe(201);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 200 Status code and User', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
//             response_post = response;
//             expect(response.statusCode).toBe(200);
//             expect(response.body.first_name).toBe(first_name);
//             expect(response.body.last_name).toBe(last_name);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 403 Status code when user is not verified', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(403);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 204 Status code when user is verified', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get(`/v1/user/verify/${response_post.body.token}`).auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(204);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         }
//         catch (err) {
//             console.log(err);
//         }
//     }); 

//     test('should return 204 Status code when user is updated', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         const request_body = {
//             first_name: first_name_update,
//             last_name: last_name_update
//         };
//         try {
//             const response = await request(app).put('/v1/user/self').send(request_body).auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(204);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     test('should return 200 Status code and User after Update', async() => {
//         const basic_auth = {
//             username: username,
//             password: password
//         };
//         try {
//             const response = await request(app).get('/v1/user/self').auth(basic_auth.username, basic_auth.password);
//             expect(response.statusCode).toBe(200);
//             expect(response.body.first_name).not.toBe(first_name_update);
//             expect(response.body.last_name).not.toBe(last_name_update);
//             expect(response.headers['cache-control']).toBe('no-cache');
//         } catch (err) {
//             console.log(err);
//         }
//     });
// });