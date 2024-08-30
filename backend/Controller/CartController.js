const Cart = require("../Model/Cart");
const Car = require("../Model/Car");
const House = require("../Model/House");

//Add To Cart
const CartCreate = async (req, res) => {
  const userId = req.User._id;
  const { id } = req.params;
  const { type, price, image, category } = req.body;
  const quantity = 1;

  const itemId = id;
  const carts = await Cart.create({
    category,
    userId,
    itemId,
    image,
    type,
    price,
    quantity,
  });
  res.status(200).json(carts);
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
  const Carts = await Cart.find({ userId: userId, itemId: itemId });

  const MyCart = await Cart.findById(Carts[0]._id);
  let quantity = MyCart.quantity;
  quantity = quantity + 1;
  const carts = await Cart.findByIdAndUpdate(
    { _id: Carts[0]._id },
    { quantity: quantity },
    { new: true }
  );
  res.status(200).json(carts);
};
//Get Cart
const GetOneCart = async (req, res) => {
  const { id } = req.params;
  const itemId = id;
  const Carts = await Cart.find({ itemId: itemId });
  const Category = Carts.category;
  if (Category == "car") {
    const Carts = await Car.find({ itemId: itemId });
    res.status(200).json(Carts);
  }
  if (Category == "house") {
    const Carts = await House.find({ itemId: itemId });
    res.status(200).json(Carts);
  }
};
module.exports = {
  CartCreate,
  GetOneCart,
  GetAllCart,
  UpdateCart,
};
