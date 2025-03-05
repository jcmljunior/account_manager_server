import express from 'express';
import { ACCOUNT_SIGNIN_ROUTE, ACCOUNT_SIGNUP_ROUTE } from "../config/accountConfig";
import accountController from "../controllers/accountController";

const router = express.Router();

router.post(ACCOUNT_SIGNIN_ROUTE, accountController.signin);
router.post(ACCOUNT_SIGNUP_ROUTE, accountController.signup);

export default router;
