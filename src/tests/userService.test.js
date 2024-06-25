const userService = require('../services/userService');
const userDAO = require('../dao/userDAO');
const UserDTO = require('../dtos/userDTO');

// Mock the userDAO methods
jest.mock('../dao/userDAO');

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '123456'
    };

    const expectedResult = { _id: 'someid', ...userData };

    userDAO.create.mockResolvedValue(expectedResult);

    const result = await userService.createUser(userData);

    expect(result).toEqual(expectedResult);
    expect(userDAO.create).toHaveBeenCalledTimes(1);
    expect(userDAO.create).toHaveBeenCalledWith(new UserDTO(userData));
  });

  it('should fetch all users', async () => {
    const mockUsers = [
      { _id: 'user1', name: 'User 1', email: 'user1@example.com', age: 25, city: 'City1', zipCode: '123456', isDeleted: false },
      { _id: 'user2', name: 'User 2', email: 'user2@example.com', age: 30, city: 'City2', zipCode: '654321', isDeleted: false }
    ];

    userDAO.findAll.mockResolvedValue(mockUsers);

    const result = await userService.getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(userDAO.findAll).toHaveBeenCalledTimes(1);
  });

  it('should fetch a user by ID', async () => {
    const userId = 'someid';
    const expectedUser = { _id: userId, name: 'Test User', email: 'test@example.com', age: 25, city: 'Test City', zipCode: '123456', isDeleted: false };

    userDAO.findById.mockResolvedValue(expectedUser);

    const result = await userService.getUserById(userId);

    expect(result).toEqual(expectedUser);
    expect(userDAO.findById).toHaveBeenCalledTimes(1);
    expect(userDAO.findById).toHaveBeenCalledWith(userId);
  });

  it('should update a user by ID', async () => {
    const userId = 'someid';
    const userData = { name: 'Updated User', city: 'Updated City' };
    const expectedUser = { _id: userId, email: 'test@example.com', name: 'Updated User', age: 25, city: 'Updated City', zipCode: '123456', isDeleted: false };

    userDAO.update.mockResolvedValue(expectedUser);

    const result = await userService.updateUser(userId, userData);

    expect(result).toEqual(expectedUser);
    expect(userDAO.update).toHaveBeenCalledTimes(1);
    expect(userDAO.update).toHaveBeenCalledWith(userId, userData);
  });

  it('should soft delete a user by ID', async () => {
    const userId = 'someid';
    const expectedUser = { _id: userId, name: 'Test User', email: 'test@example.com', age: 25, city: 'Test City', zipCode: '123456', isDeleted: true };

    userDAO.softDelete.mockResolvedValue(expectedUser);

    const result = await userService.deleteUser(userId);

    expect(result).toEqual(expectedUser);
    expect(userDAO.softDelete).toHaveBeenCalledTimes(1);
    expect(userDAO.softDelete).toHaveBeenCalledWith(userId);
  });
});
