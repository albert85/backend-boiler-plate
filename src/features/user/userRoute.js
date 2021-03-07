import express from 'express';
import User from './userController';
import userValidateBody from './userValidator';
import { validate } from '../helpers/handleResponse';

const router = express.Router();

router.post('/login/:clubId', userValidateBody.loginUser, validate, User.signin);
router.post('/signup', User.signup);

export default router;
