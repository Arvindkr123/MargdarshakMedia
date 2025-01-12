import { Router } from "express";
import { getAllAccountsController, addAccountController } from "./account.controllers";
const router = Router();

router.route("/").get(getAllAccountsController).post(addAccountController);

export default router;
