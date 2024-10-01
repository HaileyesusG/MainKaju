const {
  checkPlatformBalance,
  preAuthorizePayment,
  capturePayment,
  payoutToSeller,
  transferToSeller,
  verifyPayment,
  rechargeBalance,
  merchantPayment,
  UpdateDeposit,
} = require("../Controller/PaymentController");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const express = require("express");
const router = express.Router();
router.get("/checkPlatformBalance", checkPlatformBalance);
router.post("/preAuthorizePayment", AuthenticationUser, preAuthorizePayment);
router.post("/merchantPayment", merchantPayment);
router.patch("/UpdateDeposit", UpdateDeposit);
router.post("/capturePayment/:id", capturePayment);
router.get("/payoutToSeller", payoutToSeller);
router.post("/transferToSeller", transferToSeller);
router.post("/verifyPayment", verifyPayment);
router.post("/rechargeBalance", AuthenticationUser, rechargeBalance);
module.exports = router;
