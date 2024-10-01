const Cart = require("../Model/Cart");
const Car = require("../Model/Car");
const House = require("../Model/House");
const Electronics = require("../Model/Electronics");
//Add To Cart
const CartCreate = async (req, res) => {
  const userId = req.User._id;
  const { id } = req.params;
  const { category } = req.body;
  const itemId = id;
  const exist = await Cart.findOne({ itemId: id, userId: userId });
  if (exist) {
    return;
  }

  const carts = await Cart.create({
    category,
    userId,
    itemId,
  });
  const allCart = await Cart.find({ userId: userId });
  res.status(200).json(allCart);
};
//Get Cart
const GetAllCart = async (req, res) => {
  const userId = req.User._id;
  const Carts = await Cart.find({ userId: userId });
  res.status(200).json(Carts);
};
//Update Cart
const UpdateCart = async (req, res) => {
  const userId = req.User._id;
  const { id } = req.params;
  const itemId = id;
  const Carts = await Cart.findOne({ userId: userId, itemId: itemId });

  const MyCart = await Cart.findById(Carts._id);
  const carts = await Cart.findByIdAndUpdate(
    { _id: Carts._id, status: "paid" },
    { new: true }
  );
  res.status(200).json(carts);
};
//Get Cart
const GetOneCart = async (req, res) => {
  const { id } = req.params;
  const itemId = id;
  const Cartss = await Cart.findOne({ itemId: itemId });
  const Category = Cartss.category;
  if (Category == "car") {
    const Carts = await Car.findOne({ _id: itemId });
    res.status(200).json({ Carts: Carts, status: Cartss.status });
  }
  if (Category == "house") {
    const Carts = await House.findOne({ _id: itemId });
    res.status(200).json({ Carts: Carts, status: Cartss.status });
  }
  if (Category == "electronics") {
    const Carts = await Electronics.findOne({ _id: itemId });
    res.status(200).json({ Carts: Carts, status: Cartss.status });
  }
};
//
const deleteCart = async (req, res) => {
  const { id } = req.params;
  const exist = await Cart.findOneAndDelete({ itemId: id });
  res.status(200).json(exist);
};
module.exports = {
  CartCreate,
  GetOneCart,
  GetAllCart,
  UpdateCart,
  deleteCart,
};
