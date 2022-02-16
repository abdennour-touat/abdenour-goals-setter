const express = require("express");

const router = express.Router();
//calling the controllers to manupilate data
const {
  getGoals,
  setGoals,
  putGoals,
  deleteGoals,
} = require("../controllers/goalController");

//alternative way to call methods...
router.route("/").get(getGoals).post(setGoals);
// router.get("/", getGoals);
// router.post("/", setGoals);

router.route("/:id").put(putGoals).delete(deleteGoals);
// router.put("/:id", putGoals);
// router.delete("/:id", deleteGoals);

module.exports = router;
