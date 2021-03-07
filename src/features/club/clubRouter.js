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
router.delete(
  '/remove-member/:userId',
  ValidateToken.verifyToken,
  rolePermission([ADMIN, MANAGER]),
  Club.removeMember,
);

router.post(
  '/invite',
  ValidateToken.verifyToken,
  rolePermission([ADMIN, MANAGER]),
  clubValidateBody.sendInvite,
  validate,
  Club.inviteMember,
);

router.post(
  '/:userId/:clubId',
  ValidateToken.verifyToken,
  Club.joinClub,
);

export default router;
