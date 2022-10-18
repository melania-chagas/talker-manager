// validationTalker.js

const isTokenInvalid = (authorization) => {
  if (!authorization) {
    return {
      message: 'Token não encontrado',
    };
  }
  if (authorization.length !== 16) {
    return {
      message: 'Token inválido',
    };
  }
  return false;
};

const isNameInvalid = (name) => {
  if (!name) {
    return {
      message: 'O campo "name" é obrigatório',
    };    
  }
  if (name.length < 3) {
    return {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }
  return false;
};

const isAgeInvalid = (age) => {
  if (!age) {
    return {
      message: 'O campo "age" é obrigatório',
    };
  }
  if (Number(age) < 18) {
    return {
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  }
  return false;
};

const isDateInvalid = (watchedAt) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!watchedAt) {
    return {
      message: 'O campo "watchedAt" é obrigatório',
    };
  }
  if (!regex.test(watchedAt)) {
    return {
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  return false;
};

const isRatingInvalid = (rate) => {
  if (!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5) {
    return {
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }
  return false;
};

const isRatingEmpty = (rate) => {
  if (!rate && Number(rate) !== 0) {
    return {
      message: 'O campo "rate" é obrigatório',
    }; 
  }
  return false;
};

const isInvalidTalk = (talk, res) => {
  const BAD_REQUEST = 400;
  if (!talk) {
    return {
      message: 'O campo "talk" é obrigatório',
    };
  }
  if (isRatingEmpty(talk.rate)) {
    return res.status(BAD_REQUEST).send(isRatingEmpty(talk.rate));
  }
  if (isRatingInvalid(talk.rate)) {
    return res.status(BAD_REQUEST).send(isRatingInvalid(talk.rate));
  }
  if (isDateInvalid(talk.watchedAt)) {
    return res.status(BAD_REQUEST).send(isDateInvalid(talk.watchedAt));
  }
  return false;
};

const validationTalker = (req, res, next) => {
  const talker = req.body;
  const { talk, age, name } = talker;
  const { authorization } = req.headers;
  const BAD_REQUEST = 400;
  if (isTokenInvalid(authorization)) {
    return res.status(401).send(isTokenInvalid(authorization));
  }
  if (isNameInvalid(name)) {
    return res.status(BAD_REQUEST).send(isNameInvalid(name));
  }
  if (isAgeInvalid(age)) {
    return res.status(BAD_REQUEST).send(isAgeInvalid(age));
  }
  if (isInvalidTalk(talk, res)) {
     return res.status(BAD_REQUEST).send(isInvalidTalk(talk, res));
  }
  next();
};

module.exports = validationTalker;