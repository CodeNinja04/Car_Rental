const express = require("express");
const router = express.Router();
const {
  registerCar,
  recordCar,
  removeCar,
  getCars,
  getCar,
  getRecords,
  getRecord,
  summary,total
  
} = require("../controllers/carController");
const { protected } = require("../middlewares/auth");

// post requests

router.post("/register", registerCar);
router.post("/record",recordCar)

// get requests

router.get("/", getCars);
router.get("/car", getCar);
router.get("/records",getRecords)
router.get("/record", getRecord);
router.post("/remove",removeCar);
router.get("/summary",summary);
router.get("/total",total);

//router.get("/me", protected, registerCar);

module.exports = router;
