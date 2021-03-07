import express from 'express';
import club from './club/clubRouter';
import user from './user/userRoute';

const router = express();

router.use('/api/v1/club', club);
router.use('/api/v1/user', user);

export default router;
