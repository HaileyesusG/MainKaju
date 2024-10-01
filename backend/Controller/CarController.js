const Car = require("../Model/Car");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
//Sign Up
const CarCreate = async (req, res) => {
  const userId = req.User._id;
  const userEmail = req.User.email;
  const Status = req.User.status;
  const userLocation = req.User.location;
  const bankAccount = req.User.bankAccount;
  let slat;
  let slon;
  let location;
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        userLocation
      )}&key=9ddcd8b5269349368ef7069e700d9e77`
    );
    //console.log("Abebe", response.json);
    const data = await response.json();
    if (!response.ok) {
      console.log("the error response is", data);
      return res.status(200).json({ message: "No Internet Connection" });
    }

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      slat = lat;
      slon = lng;
      console.log("slat", slat);
      console.log("slon", slon);
    } else {
      console.log("No results found");
    }
  } catch (error) {
    return res.status(400).json({ message: "No Internet Connection" });
  }

  async function getCityFromCoordinates(lat, lon) {
    const apiKey = "9ddcd8b5269349368ef7069e700d9e77";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;

      if (results.length > 0) {
        const components = results[0].components;

        // Check for city-level information
        if (components.city) {
          return components.city;
        }

        // Check for administrative levels that may represent the city
        if (
          components.state &&
          components.state.toLowerCase() === "addis ababa"
        ) {
          return "Addis Ababa";
        }
        if (
          components.region &&
          components.region.toLowerCase() === "addis ababa"
        ) {
          return "Addis Ababa";
        }

        // Check other possible fields
        if (components.town) {
          return components.town;
        }
        if (components.village) {
          return components.village;
        }
        if (components.county) {
          return components.county;
        }
        if (components.state_district) {
          return components.state_district;
        }
        if (components.state) {
          return components.state;
        }
        if (components.region) {
          return components.region;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Example usage:
  const latitude = slat;
  const longitude = slon;

  getCityFromCoordinates(latitude, longitude).then(async (city) => {
    try {
      location = city;
      console.log(city);
      let Try = req.User.try;
      let Deposite = req.User.deposite;
      const {
        type,
        brand,
        For,
        transmission,
        fuel,
        licence,
        price,
        year,
        model,
        description,
        category,
        Llimit,
        Ulimit,
      } = req.body;

      const [image1, image2, image3, image4, image5] = req.files["testImages"];
      if (Status == "New") {
        try {
          const Cars = await Car.create({
            userId,
            userEmail,
            type,
            brand,
            For,
            transmission,
            location: location,
            fuel,
            licence,
            price,
            year,
            model,
            description,
            category,
            Llimit,
            Ulimit,
            image: image1.filename,
            image2: image2 ? image2.filename : "",
            image3: image3 ? image3.filename : "",
            image4: image4 ? image4.filename : "",
            image5: image5 ? image5.filename : "",
          });
          Try = Try - 1;
          await User.findByIdAndUpdate({ _id: userId }, { try: Try });
          if (Try == 0) {
            await User.findByIdAndUpdate({ _id: userId }, { status: "Old" });
          }

          res.status(200).json({
            Cars,
          });
        } catch (err) {
          res.status(400).json({ message: err.message });
          console.log("the error is", err);
        }
      } else {
        if (Deposite < 30) {
          throw Error("Insufficient");
        }
        const Cars = await Car.create({
          userId,
          userEmail,
          type,
          brand,
          For,
          transmission,
          location: location,
          fuel,
          licence,
          price,
          year,
          model,
          description,
          category,
          Llimit,
          Ulimit,
          image: image1.filename,
          image2: image2 ? image2.filename : "",
          image3: image3 ? image3.filename : "",
          image4: image4 ? image4.filename : "",
          image5: image5 ? image5.filename : "",
        });
        Deposite = Deposite - 30;
        await User.findByIdAndUpdate({ _id: userId }, { deposite: Deposite });

        res.status(200).json({
          Cars,
        });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
      console.log("the error is", err);
    }
  });
};

//Get all
const GetAllCar = async (req, res) => {
  const result = await Car.find({});
  res.status(200).json(result);
};
//Get one Car
const GetOneCar = async (req, res) => {
  const { id } = req.params;
  const result = await Car.findById(id);
  const userId = result.userId;
  const user = await User.findById(userId);
  res.status(200).json({ result, user });
};
//rating
const rateCar = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
  const userId = req.User._id; // Assuming user is authenticated

  try {
    const product = await Car.findById(id);

    // Check if user has already rated
    const existingRating = product.ratings.find(
      (r) => r.userId.toString() === userId.toString()
    );

    if (existingRating) {
      // Update rating
      existingRating.rating = rating;
      existingRating.comment = comment;
    } else {
      // Add new rating
      product.ratings.push({ userId, rating, comment });
    }

    // Update average rating
    const totalRating = product.ratings.reduce((acc, r) => acc + r.rating, 0);
    product.averageRating = totalRating / product.ratings.length;

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error adding rating", error: err });
  }
};
//fetch rating
const fetchRating = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Car.findById(id).populate("ratings.userId");
    res.json(product.ratings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ratings", error: err });
  }
};

module.exports = {
  fetchRating,
  rateCar,
  GetOneCar,
  CarCreate,
  GetAllCar,
};
