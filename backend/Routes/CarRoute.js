const {
  CarCreate,
  GetAllCar,
  GetOneCar,
  fetchRating,
  rateCar,
} = require("../Controller/CarController");

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
router.route("/GetAllCar").get(GetAllCar);
router.route("/GetOneCar/:id").get(GetOneCar);
router.route("/fetchRating/:id").get(fetchRating);
router.route("/rateCar/:id").get(rateCar);
router.route("/CarCreate").post(AuthenticationUser, upload, CarCreate);
module.exports = router;
