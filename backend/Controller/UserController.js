const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Applicant = require("../Model/Applicants");
//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

//Sign Up
const UserCreate = async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    gender,
    mobileMoney,
    email,
    password,
    bankAccount,
    image,
    image2,
    image3,
  } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "africadish9@gmail.com",
      pass: "jhrpmzwkhvapckpt",
    },
  });

  const mailOptions = {
    from: "africadish9@gmail.com",
    to: email,
    subject: "You Can Start A Job",
    text: `You have been registered! Your Email and password is ${email} and ${password}`,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(new Error("Failed to send Email"));
        } else {
          resolve();
        }
      });
    });

    const techs = await User.SignUp(
      firstname,
      lastname,
      gender,
      mobileMoney,
      email,
      password,
      bankAccount,
      image,
      image2,
      image3
    );

    res.status(200).json({
      firstname,
      lastname,
      gender,
      mobileMoney,
      email,
      bankAccount,
      image,
      image2,
      image3,
    });
    //const update = await Applicant.findOneAndDelete({ _id: id });
  } catch (err) {
    console.error("Failed to send Email:", err);
    res.status(400).json({ message: err.message });
  }
};

//Login

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const techs = await User.Login(email, password);
    const _id = techs._id;
    const firstname = techs.firstname;
    const lastname = techs.lastname;
    const image = techs.image;
    const phonenumber = techs.mobileMoney;
    const email1 = techs.email;
    const gender = techs.gender;
    const location = techs.location;
    //token
    const token = createToken(_id);
    res.status(200).json({
      gender,
      firstname,
      lastname,
      image: image,
      email1,
      phonenumber,
      _id,
      token,
      location,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Get all(if Super Admin is Available for the future)

const GetUser = async (req, res) => {
  const cv = await User.find({});
  res.status(200).json(cv);
};
// Get one(if Super Admin is Available for the future)
const GetOneUserById = async (req, res) => {
  const { id } = req.params;
  const cv = await User.findById(id);
  res.status(200).json(cv);
};

//Delete

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  let result = await User.findOneAndDelete({ _id: id });
  result = await User.find({});
  res.status(200).json(result);
};

module.exports = {
  UserCreate,
  GetUser,
  GetOneUserById,
  DeleteUser,
  LoginUser,
};
