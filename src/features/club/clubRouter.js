import express from 'express';
import ValidateToken from '../helpers/handleToken';
import Club from './clubController';
import clubValidateBody from './clubValidator';
import {
  validate,
  rolePermission,
  ADMIN,
  MANAGER,
} from '../helpers/handleResponse';

const router = express.Router();

router.get(
  '/analytics',
  ValidateToken.verifyToken,
  rolePermission([ADMIN]),
  Club.getMemberAnalytics,
);
router.post(
  '/',
  ValidateToken.verifyToken,
  rolePermission([ADMIN, MANAGER]),
  clubValidateBody.createClub,
  validate,
  Club.createClub,
);
router.get('/user', ValidateToken.verifyToken, Club.getUserClub);

router.get(
  '/invite',
  ValidateToken.verifyToken,
  rolePermission([ADMIN]),
  Club.getUserClub,
);

export default router;
