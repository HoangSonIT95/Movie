const UserToken = require('../models/userToken');

exports.authLogin = (req, res, next) => {
  const userId = req.body.userId;
  const userPw = req.body.password;
  UserToken.fetchAll(userToken => {
    const user = userToken.find(
      user => user.userId === userId && user.password === userPw
    );
    if (!user) {
      res.status(401).send('Unauthorize');
    } else {
      res.json(user.token);
    }
  });
};
