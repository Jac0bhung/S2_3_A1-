// app.js
// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;

// require handlebars in the project
const exphbs = require("express-handlebars");
const resaurantData = require("./restaurant.json").results;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
// routes setting
app.get("/", (req, res) => {
  // const restaurantOne = {
  //   id: 1,
  //   name: `Sababa 沙巴巴中東美食<`,
  //   image: `https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg`,
  //   category: `中東料理`,
  //   rating: `4.1`,
  // };
  res.render("index", { restaurants: resaurantData });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  console.log(`req.params.resaurant_id`, req.params.restaurant_id);
  const restaurant = resaurantData.filter(
    (resaurant) => resaurant.id == req.params.restaurant_id
  );
  // const restaurantOne = {
  //   id: 1,
  //   name: "Sababa 沙巴巴中東美食",
  //   name_en: "Sababa Pita Bar",
  //   category: "中東料理",
  //   image:
  //     "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
  //   location: "台北市羅斯福路三段 283 巷 17 號",
  //   phone: "02 2363 8009",
  //   google_map: "https://goo.gl/maps/BJdmLuVdDbw",
  //   rating: 4.1,
  //   description:
  //     "沙巴巴批塔是台灣第一家純手工批塔專賣店,只選用最新鮮的頂級原料,以及道地的中東家傳配方。",
  // };
  console.log(restaurant);
  res.render("show", { restaurant: restaurant[0] });
});

app.get("/search", (req, res) => {
  console.log("req.query", req.query);
  const keyword = req.query.keyword.trim().toLowerCase();
  console.log(keyword);
  const restaurant = resaurantData.filter((restaurant) => {
    return restaurant.name.trim().toLowerCase().includes(keyword);
  });
  res.render("index", { restaurants: restaurant, keyword });
});
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
