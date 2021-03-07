import { check } from 'express-validator';

const clubValidateBody = {
  createClub: [
    check('name')
      .trim()
      .isString()
      .withMessage('Provide a valid club name')
      .notEmpty()
      .withMessage('Provide a valid club name'),
    check('address')
      .trim()
      .isString()
      .withMessage('Provide a valid club address')
      .notEmpty()
      .withMessage('Provide a valid club address'),
  ],
};

export default clubValidateBody;
