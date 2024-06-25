// userDAO.test.js

const mongoose = require("mongoose");
const User = require("../models/User"); // Assuming User model is defined
const userDAO = require("../dao/userDAO");

// Mocking the database connection and User model
// Mocking the User model
jest.mock("../models/User", () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };
});

describe("User DAO", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user in the database", async () => {
    const userData = {
      email: "test@example.com",
      name: "Test User",
      age: 25,
      city: "Test City",
      zipCode: "123456",
    };

    const expectedResult = { _id: "someid", ...userData };

    // Mock the User model's create method
    User.create.mockResolvedValue(expectedResult);

    const result = await userDAO.create(userData);

    expect(result).toEqual(expectedResult);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith(userData);
  });

  it("should fetch all users from the database", async () => {
    const mockUsers = [
      {
        _id: "user1",
        name: "User 1",
        email: "user1@example.com",
        age: 25,
        city: "City1",
        zipCode: "123456",
        isDeleted: false,
      },
      {
        _id: "user2",
        name: "User 2",
        email: "user2@example.com",
        age: 30,
        city: "City2",
        zipCode: "654321",
        isDeleted: false,
      },
    ];

    // Mock the find method of User model to return mockUsers
    User.find.mockResolvedValue(mockUsers);

    const result = await userDAO.findAll();

    expect(result).toEqual(mockUsers);
    expect(User.find).toHaveBeenCalledTimes(1);
    expect(User.find).toHaveBeenCalledWith({ isDeleted: false });
  });

  it("should fetch a user by ID from the database", async () => {
    const userId = "someid";
    const expectedUser = {
      _id: userId,
      name: "Test User",
      email: "test@example.com",
      age: 25,
      city: "Test City",
      zipCode: "123456",
      isDeleted: false,
    };

    // Mock the findById method of User model to return expectedUser
    User.findById.mockResolvedValue(expectedUser);

    const result = await userDAO.findById(userId);

    expect(result).toEqual(expectedUser);
    expect(User.findById).toHaveBeenCalledTimes(1);
    expect(User.findById).toHaveBeenCalledWith(userId);
  });

  it("should update a user by ID in the database", async () => {
    const userId = "someid";
    const userData = { name: "Updated User", city: "Updated City" };
    const expectedUser = {
      _id: userId,
      email: "test@example.com",
      name: "Updated User",
      age: 25,
      city: "Updated City",
      zipCode: "123456",
      isDeleted: false,
    };

    // Mock the findByIdAndUpdate method of User model to return expectedUser
    User.findByIdAndUpdate.mockResolvedValue(expectedUser);

    const result = await userDAO.update(userId, userData);

    expect(result).toEqual(expectedUser);
    expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, userData, {
      new: true,
    });
  });

  it("should soft delete a user by ID in the database", async () => {
    const userId = "someid";
    const expectedUser = {
      _id: userId,
      name: "Test User",
      email: "test@example.com",
      age: 25,
      city: "Test City",
      zipCode: "123456",
      isDeleted: true,
    };

    // Mock the findByIdAndUpdate method of User model to return expectedUser
    User.findByIdAndUpdate.mockResolvedValue(expectedUser);

    const result = await userDAO.softDelete(userId);

    expect(result).toEqual(expectedUser);
    expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, {
      isDeleted: true,
    });
  });
});
