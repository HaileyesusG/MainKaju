const {
  AdminCreate,
  GetAdmin,
  LoginAdmin,
  RechargeBalance,
  GetOneAdminById,
} = require("../Controller/AdminController");

const multer = require("multer");
// const AuthenticationAdmin = require("../MiddleWare/AuthenticationAdmin");
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
}).single("testImage");

const express = require("express");
const router = express.Router();
router.route("/GetAdmin").get(GetAdmin);
//router.route("/GetOneTech").get(AuthenticationTech, GetOneTech);
router.route("/AdminCreate").post(upload, AdminCreate);
router.route("/LoginAdmin").post(LoginAdmin);
router.route("/RechargeBalance").post(RechargeBalance);
router.route("/GetOneAdminById/:id").get(GetOneAdminById);
//   router.route("/:id").patch(upload, UpdateTech);
//   router.route("/:id").get(GetOneTech).delete(DeleteTech).patch(UpdateTech);

module.exports = router;
