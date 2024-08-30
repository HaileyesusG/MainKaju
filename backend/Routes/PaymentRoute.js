const {
  checkPlatformBalance,
  preAuthorizePayment,
  capturePayment,
  payoutToSeller,
  transferToSeller,
  verifyPayment,
  rechargeBalance,
} = require("../Controller/PaymentController");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const express = require("express");
const router = express.Router();
router.get("/checkPlatformBalance", checkPlatformBalance);
router.post(
  "/preAuthorizePayment/:id",
  AuthenticationUser,
  preAuthorizePayment
);
router.post("/capturePayment/:id", capturePayment);
router.get("/payoutToSeller", payoutToSeller);
router.post("/transferToSeller", transferToSeller);
router.post("/verifyPayment", verifyPayment);
router.post("/rechargeBalance", AuthenticationUser, rechargeBalance);
module.exports = router;
