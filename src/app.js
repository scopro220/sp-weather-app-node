const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//  Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Scott",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    aboutText: "This is a weather application",
    name: "Scott",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpfulText: "This is some helpful text",
    title: "Help Page",
    name: "Scott",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geoCode(req.query.address, (error, { latitude, longitude, city } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        city,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "404",
    name: "Scott",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not Found",
    title: "404",
    name: "Scott",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
