const Car = require("../Model/Car");
const House = require("../Model/House");
const axios = require("axios");
//GetAllItems

const GetAllItems = async (req, res) => {
  const userLocation = req.User.location;

  let notytimeout;
  let slat;
  let slon;

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
      console.error(error);
      return null;
    }
  }

  // Example usage:
  const latitude = slat;
  const longitude = slon;

  getCityFromCoordinates(latitude, longitude).then(async (city) => {
    console.log(city); // Outputs "Addis Ababa" for Kolfe Keranio, Addis Ababa
    const Houses = await House.find({ location: city });
    const Cars = await Car.find({ location: city });

    // Combine the arrays
    const combinedArray = [...Houses, ...Cars];

    // Sort the combined array from latest to earliest
    combinedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Send the sorted array as a JSON response
    res.status(200).json(combinedArray);
  });
};
module.exports = {
  GetAllItems,
};
