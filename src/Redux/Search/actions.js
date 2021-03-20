import { SEARCHED } from "./actionTypes";
import axios from "axios";

export const searchedData = (payload) => {
  return {
    type: SEARCHED,
    payload,
  };
};

export const searchQuery = (payload) => (dispatch) => {
  console.log("searching")
  var config = {
    method: "post",
    url: "https://birdsapi.herokuapp.com/api/birds/search",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      dispatch(searchedData(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
