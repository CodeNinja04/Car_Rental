const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Car = require("../models/carModel");
const Record = require("../models/recordModel");
// car entities
// Price
// SKU
// Car Model
// Car Name

const registerCar = asyncHandler(async (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");

  const { name, model, sku, price } = req.body;

  if (!name || !model || !sku || !price) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if car exists
  // const carExists = await Car.findOne({ model });

  // if (carExists) {
  //   res.status(400);
  //   throw new Error("car already exists");
  // }

  const car = await Car.create({
    name,
    model,
    sku,
    price,
  });

  if (car) {
    res.status(201).json({
      _id: car.id,
      name: car.name,
      model: car.model,
      price: car.price,
      sku: car.sku,
    });
  } else {
    res.status(400);
    throw new Error("Invalid car data");
  }
});

const recordCar = asyncHandler(async (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");
  const { name, model, clientname, clientemail, date, day } = req.body;

  const car = await Car.findOne({ name, model });
  var carname = car.name;
  var carmodel = car.model;
  var carsku = car.sku;
  var carprice = car.price;

  const record = await Record.create({
    car,
    carname,
    carmodel,
    carsku,
    carprice,
    clientname,
    clientemail,
    date,
    day,
  });

  res.status(200).send({ record });
});

const removeCar = asyncHandler(async (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");
  const { name, model } = req.body;

  const car = await Car.findOne({ name, model });
  
  if(!car){
    throw new Error("car not found")
  }
  else{
    const removed = await Car.deleteOne({name,model});
    console.log(removed)
    res.status(200).send(` car ${car.name} with model ${car.model} is removed `)
  }

});

const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({});
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    cars,
  });
});

const getCar = asyncHandler(async (req, res) => {
  const { name, model } = req.body;
  const car = await Car.findOne({ name, model });
  res.header("Access-Control-Allow-Origin", "*");

  res.status(200).send({
    car,
  });
});

const getRecords = asyncHandler(async (req, res) => {
  const rec = await Record.find({});
  res.header("Access-Control-Allow-Origin", "*");

  res.status(200).send({ rec });
});

const getRecord = asyncHandler(async (req, res) => {
  const { name, model } = req.body;
  const car = await Car.findOne({ name, model });

  const rec = await Record.find({ car });
  res.header("Access-Control-Allow-Origin", "*");

  res.status(200).json({
    car: car,
    record: rec,
  });
});

const summary = asyncHandler(async (req, res) => {
  const car = await Car.find({});

  const rec = await Record.find({});

  res.header("Access-Control-Allow-Origin", "*");

  Record.aggregate(
    [
      {
        $group: {
          _id: { model: "$carmodel", name: "$carname" },
          total: {
            $sum: "$carprice",
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

const total = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  
  Record.aggregate(
    [
      {
        $group: {
          _id: 1,
          total: {
            $sum: "$carprice",
          },
          counts: {$count:{}},
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = {
  registerCar,
  recordCar,
  removeCar,
  getCars,
  getCar,
  getRecords,
  getRecord,
  summary,
  total,
};
