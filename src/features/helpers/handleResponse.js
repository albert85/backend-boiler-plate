/* eslint-disable consistent-return */
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export const ADMIN = 'admin';
export const MANAGER = 'manager';
export const MEMBER = 'member';

export const handleResponse = (
  res,
  statusCode,
  status,
  message,
  data,
) => res.status(statusCode).json({
  status,
  message,
  data,
});


export const rolePermission = roles => async (req, res, next) => {
  const { role } = req.user;
  console.log(role);
  const hasPermission = roles.includes(role);
  if (!hasPermission) {
    return handleResponse(
      res,
      401,
      'Failed',
      'You do not have the required permission',
    );
  }
  next();
};

export const catchErrors = action => async (req, res) => {
  try {
    return await action(req, res);
  } catch ({ message, code }) {
    return res.status(code && code >= 400 && code < 600 ? code : 500).json({
      status: 'Failed',
      message: 'Error occurred',
      data: message,
    });
  }
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export const decodeUserToken = token => jwt.verify(token, process.env.TOKEN_PASSWORD);
