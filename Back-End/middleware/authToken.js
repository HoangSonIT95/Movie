const userToken = require('../models/userToken');

exports.authToken = (req, res, next) => {
  //console.log(req.headers['authorization']);
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).send('<h1>Unauthorized</h1>');
  } else {
    const token = authHeader;
    userToken.fetchAll(userToken => {
      const auth = userToken.filter(user => user.token === token);
      if (auth.length > 0) {
        next();
      } else res.status(401).send('<h1>Unauthorized</h1>');
    });
  }
};
