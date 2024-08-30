const {
  CartCreate,
  GetOneCart,
  GetAllCart,
  UpdateCart,
} = require("../Controller/CartController");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");

const express = require("express");
const router = express.Router();
router.route("/CartCreate/:id").post(AuthenticationUser, CartCreate);
router.route("/GetAllCart").get(AuthenticationUser, GetAllCart);
router.route("/GetOneCart/:id").get(GetOneCart);
router.route("/UpdateCart/:id").get(AuthenticationUser, UpdateCart);
module.exports = router;
