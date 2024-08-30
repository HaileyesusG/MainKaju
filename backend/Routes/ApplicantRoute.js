const {
  ApplicantCreate,
  GetApplicant,
  GetAllApplicant,
  GenerateOtp,
  deleteApplicant,
} = require("../Controller/ApplicantController");

const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../KajuProject/frontend/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).fields([{ name: "testImages", maxCount: 3 }]);
const express = require("express");
const router = express.Router();
router.route("/GetApplicant/:id").get(GetApplicant);
router.route("/GetAllApplicant").get(GetAllApplicant);
router.route("/ApplicantCreate").post(upload, ApplicantCreate);
router.route("/GenerateOtp").post(GenerateOtp);
router.route("/deleteApplicant/:id").delete(deleteApplicant);
module.exports = router;
