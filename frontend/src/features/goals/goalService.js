import axios from "axios";

const API_URL = "/api/goals/";

//create new goal

const createGoal = async (goalData, token) => {
  // we added the header because this route is protected and it needs the token to use it
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

//Get all the Goals for a user

const getAllGoals = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};
// delete a goal..
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

//delete Goal from the database
const goalService = {
  createGoal,
  getAllGoals,
  deleteGoal,
};

export default goalService;
