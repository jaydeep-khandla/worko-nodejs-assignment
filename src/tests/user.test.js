const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes');
const auth = require('../middlewares/auth');
const userService = require('../services/userService');

// Mock the user service functions
jest.mock('../services/userService');

const app = express();
app.use(bodyParser.json());

// Middleware to simulate authentication
app.use(auth);
app.use('/api/users', userRoutes);

const mockUser = {
  id: '6797ca47e8239256b515fdc',
  email: 'example@example.com',
  name: 'John Doe',
  age: 30,
  city: 'New York',
  zipCode: '123456'
};

describe('User API Endpoints', () => {
  beforeEach(() => {
    // Clear mock calls
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    userService.createUser.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/api/users/')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=') // admin:password
      .send({
        email: 'example@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '123456'
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it('should return 400 if validation fails on user creation', async () => {
    const response = await request(app)
      .post('/api/users/')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send({
        email: 'example@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '12345' // Invalid zip code
      });

    expect(response.status).toBe(400);
  });

  it('should get all users', async () => {
    userService.getAllUsers.mockResolvedValue([mockUser]);

    const response = await request(app)
      .get('/api/users/')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockUser]);
  });

  it('should get a user by ID', async () => {
    userService.getUserById.mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should return 404 if user not found', async () => {
    userService.getUserById.mockResolvedValue(null);

    const response = await request(app)
      .get('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(404);
  });

  it('should update a user', async () => {
    userService.updateUser.mockResolvedValue(mockUser);

    const response = await request(app)
      .put('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send({
        email: 'example@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should return 404 if user not found on update', async () => {
    userService.updateUser.mockResolvedValue(null);

    const response = await request(app)
      .put('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send({
        email: 'example@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '123456'
      });

    expect(response.status).toBe(404);
  });

  it('should delete a user', async () => {
    userService.deleteUser.mockResolvedValue(mockUser);

    const response = await request(app)
      .delete('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('should return 404 if user not found on delete', async () => {
    userService.deleteUser.mockResolvedValue(null);

    const response = await request(app)
      .delete('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(404);
  });

  it('should return 401 if no credentials sent', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('No credentials sent!');
  });

  it('should return 401 if invalid credentials sent', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', 'Basic invalidcredentials');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  // Additional tests to improve coverage
  it('should return 400 if user ID is invalid on getUserById', async () => {
    const response = await request(app)
      .get('/api/users/invalidUserId')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(400);
  });

  it('should return 400 if user ID is invalid on updateUser', async () => {
    const response = await request(app)
      .put('/api/users/invalidUserId')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send({
        email: 'example@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '123456'
      });

    expect(response.status).toBe(400);
  });

  it('should return 500 if createUser throws an error', async () => {
    userService.createUser.mockRejectedValue(new Error('Internal Server Error'));

    const response = await request(app)
      .post('/api/users/')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send({
        email: 'example@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '123456'
      });

    expect(response.status).toBe(500);
  });

  it('should return 500 if getAllUsers throws an error', async () => {
    userService.getAllUsers.mockRejectedValue(new Error('Internal Server Error'));

    const response = await request(app)
      .get('/api/users/')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(500);
  });

  it('should return 500 if updateUser throws an error', async () => {
    userService.updateUser.mockRejectedValue(new Error('Internal Server Error'));

    const response = await request(app)
      .put('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send({
        email: 'example@example.com',
        name: 'John Doe',
        age: 30,
        city: 'New York',
        zipCode: '123456'
      });

    expect(response.status).toBe(500);
  });

  it('should return 500 if deleteUser throws an error', async () => {
    userService.deleteUser.mockRejectedValue(new Error('Internal Server Error'));

    const response = await request(app)
      .delete('/api/users/66797ca47e8239256b515fdc')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=');

    expect(response.status).toBe(500);
  });
});
