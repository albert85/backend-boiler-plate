import { check, param } from 'express-validator';

const validateBody = {
  createClub: [
    param('feedId').isInt().trim()
      .withMessage('Provide a valid request Id'),
    check('price').isInt().trim()
      .withMessage('Provide a valid price and must be an integer'),
  ],
};

export default validateBody;
