import { check } from 'express-validator';

const userValidateBody = {
  loginUser: [
    check('email')
      .trim()
      .isEmail()
      .withMessage('Provide a valid email')
      .notEmpty()
      .withMessage('password must not be empty'),
    check('password')
      .trim()
      .isString()
      .withMessage('Provide a valid password')
      .notEmpty()
      .withMessage('password must not be empty'),
  ],
};

export default userValidateBody;
