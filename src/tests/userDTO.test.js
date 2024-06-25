// userDTO.test.js

const userDTO = require('../dtos/userDTO');

describe('User DTO', () => {
  it('should create a user DTO', () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '123456'
    };

    const result = new userDTO(userData);

    expect(result).toEqual({
      email: 'test@example.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '123456'
    });
  });
});
