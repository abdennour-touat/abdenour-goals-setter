const express = require("express");

const router = express.Router();
//calling the controllers to manupilate data
const {
  getGoals,
  setGoals,
  putGoals,
  deleteGoals,
} = require("../controllers/goalController");
const {protect} = require('../middleware/authMiddleware');

//alternative way to call methods...
router.route("/").get(protect, getGoals).post(protect, setGoals);
// router.get("/", getGoals);
// router.post("/", setGoals);

router.route("/:id").put(protect, putGoals).delete(protect, deleteGoals);
// router.put("/:id", putGoals);
// router.delete("/:id", deleteGoals);

module.exports = router;
