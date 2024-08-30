const {
  UserCreate,
  GetUser,
  GetOneUserById,
  DeleteUser,
  LoginUser,
} = require("../Controller/UserController");

const multer = require("multer");
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

const express = require("express");
const router = express.Router();
router.route("/GetUser").get(GetUser);
router.route("/UserCreate/:id").post(UserCreate);
router.route("/LoginUser").post(LoginUser);
router.route("/GetOneUserById/:id").get(GetOneUserById);
router.route("/:id").delete(DeleteUser);
module.exports = router;
