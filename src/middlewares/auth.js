const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No credentials sent!' });
    }
  
    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
    const [username, password] = decodedCredentials.split(':');
  
    if (username === 'admin' && password === 'password') {
      next();
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  module.exports = auth;
  