import express from 'express';
import { createUser, loginUser } from '../controller/userController.js';
import { createUserMiddleware } from '../middlewares/usermiddlewares.js';

const router = express.Router()

router.post('/', createUserMiddleware ,  createUser)
router.post('/login', loginUser)

export default router