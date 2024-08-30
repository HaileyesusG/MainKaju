const { GetAllItems } = require("../Controller/GetAllItemController");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const express = require("express");
const router = express.Router();
router.route("/GetAllItems").get(AuthenticationUser, GetAllItems);
module.exports = router;
