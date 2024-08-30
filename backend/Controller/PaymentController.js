const axios = require("axios");
const { Chapa } = require("chapa-nodejs");
const User = require("../Model/User");
const CHAPA_BASE_URL = process.env.CHAPA_BASE_URL;
const CHAPA_TEST_SECRET_KEY = process.env.CHAPA_TEST_SECRET_KEY;
const chapa = new Chapa({
  secretKey: CHAPA_TEST_SECRET_KEY,
});
const checkPlatformBalance = async (req, res) => {
  try {
    const response = await axios.get(`${CHAPA_BASE_URL}/balance`, {
      headers: {
        Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error checking platform balance",
      error: error.message,
    });
  }
};
//Payment
const preAuthorizePayment = async (req, res) => {
  const { id } = req.params;
  const id1 = req.User._id;
  const fname = req.User.firstname;
  const lname = req.User.lastname;
  const email = req.User.email;
  const paymentData = req.body;
  const customer = await User.findById(id1);
  const seller = await User.findById(id);
  const tx_ref = await chapa.generateTransactionReference();
  try {
    const response = await chapa.initialize({
      first_name: fname,
      last_name: lname,
      email: email,
      currency: "ETB",
      amount: paymentData.amount,
      tx_ref: tx_ref,
      callback_url: "https://google.com/",
      return_url: paymentData.return_url,
      customization: {
        title: "Test Title",
        description: "Test Description",
      },
    });
    const Detail = response.data;
    if (customer.deposite >= paymentData.amount) {
      const deposite = customer.deposite - paymentData.amount;
      const deposite2 = seller.deposite + paymentData.amount;
      const balance = await User.findByIdAndUpdate(
        { _id: id1 },
        { deposite: deposite },
        { new: true }
      );
      const balance2 = await User.findByIdAndUpdate(
        { _id: id },
        { deposite: deposite2 },
        { new: true }
      );
      res.status(200).json({ Detail, tx_ref, balance, balance2 });
    } else {
      return res.status(400).json({ message: "insufficient Balance" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error pre-authorizing payment", error: error.message });
  }
};

//Recharge Account
const rechargeBalance = async (req, res) => {
  const id = req.User._id;
  const fname = req.User.firstname;
  const lname = req.User.lastname;
  const email = req.User.email;
  const paymentData = req.body;
  const customer = await User.findById(id);
  const tx_ref = await chapa.generateTransactionReference();
  try {
    const response = await chapa.initialize({
      first_name: fname,
      last_name: lname,
      email: email,
      currency: "ETB",
      amount: paymentData.amount,
      tx_ref: tx_ref,
      callback_url: "https://google.com",
      return_url: paymentData.return_url,
      customization: {
        title: "Test Title",
        description: "Test Description",
      },
    });
    const Detail = response.data;
    const deposite = customer.deposite + paymentData.amount;
    const balance = await User.findByIdAndUpdate(
      { _id: id },
      { deposite: deposite },
      { new: true }
    );
    res.status(200).json({ Detail, tx_ref, balance });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error pre-authorizing payment", error: error.message });
  }
};

const capturePayment = async (req, res) => {
  const { transactionId } = req.params;
  try {
    const response = await axios.post(
      `${CHAPA_BASE_URL}/transaction/capture/${transactionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error capturing payment", error: error.message });
  }
};

const payoutToSeller = async (req, res) => {
  // const { amount } = req.body;
  // const { id } = req.params;
  // const sellerId = id;
  try {
    // const balance = await axios.get(`${CHAPA_BASE_URL}/balance`, {
    //   headers: {
    //     Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
    //   },
    // });
    // console.log("the balance", balance);

    // const seller = await User.findById(sellerId);
    // if (!seller) {
    //   return res.status(404).json({ message: "Seller not found" });
    // }

    // const payoutData = {
    //   amount,
    //   recipient: {

    //     bank_account: seller.bankAccount,
    //     mobile_money: seller.mobileMoney,
    //   },
    // };

    const response = await axios.get(`${CHAPA_BASE_URL}/banks`, {
      headers: {
        Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payout", error: error.message });
  }
};
const transferToSeller = async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post(`${CHAPA_BASE_URL}/transfers`, data, {
      headers: {
        Authorization: `Bearer ${CHAPA_TEST_SECRET_KEY}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payout", error: error.message });
  }
};
const verifyPayment = async (req, res) => {
  const { tx_ref, status } = req.body;
  try {
    const response = await chapa.verify({
      tx_ref,
    });
    console.log("the response is", response.data);
    if (response.data.status === "success") {
      // Logic to recharge user's virtual balance
      console.log(" i am going to rechage your balance");
    } else {
      console.log(" try again to rechage your balance");
    }
    res.status(200).json(response.data);
  } catch (error) {
    console.log("the error is", error);
    res
      .status(500)
      .json({ message: "Error processing payout", error: error.message });
  }
};

module.exports = {
  checkPlatformBalance,
  preAuthorizePayment,
  capturePayment,
  payoutToSeller,
  transferToSeller,
  verifyPayment,
  rechargeBalance,
};
