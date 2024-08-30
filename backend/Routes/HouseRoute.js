const {
  HouseCreate,
  GetAllHouse,
  GetOneHouse,
  fetchRating,
  rateHouse,
} = require("../Controller/HouseController");

const multer = require("multer");
const AuthenticationUser = require("../MiddleWare/AuthenticationUser");
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).fields([{ name: "testImages", maxCount: 5 }]);
const express = require("express");
const router = express.Router();
router.route("/GetAllHouse").get(GetAllHouse);
router.route("/GetOneHouse/:id").get(GetOneHouse);
router.route("/HouseCreate").post(AuthenticationUser, upload, HouseCreate);
router.route("/fetchRating/:id").get(fetchRating);
router.route("/rateHouse/:id").get(AuthenticationUser, rateHouse);
module.exports = router;
