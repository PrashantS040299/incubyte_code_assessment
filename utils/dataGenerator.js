function generateUser() {
    const randomNum = Math.floor(Math.random() * 100000);
    return {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Elm Street',
      city: 'Sample City',
      state: 'StateX',
      zip: '12345',
      phone: '5551234567',
      ssn: '123-45-6789',
      username: `user${randomNum}`,
      password: `Password!${randomNum}`,
    };
  }
  
  module.exports = { generateUser };