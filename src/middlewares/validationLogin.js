const isInvalidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email === '') {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }
  if (!regex.test(email)) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
  return false;
};

const isInvalidPassword = (password) => {
  const minimumCharacterValue = 6;
  if (!password || password === '') {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }
  if (password.length < minimumCharacterValue) {
    return {
      message: 'O "password" deve ter pelo menos 6 caracteres',
    };
  }
  return false;
};

const validationLogin = (req, res, next) => {
  const body = { ...req.body };
  const { email, password } = body;
  const BAD_REQUEST = 400;
  if (isInvalidEmail(email)) {
    res.status(BAD_REQUEST).send(isInvalidEmail(email));
  }
  if (isInvalidPassword(password)) {
    res.status(BAD_REQUEST).send(isInvalidPassword(password));
  }

  next();
};

module.exports = validationLogin;