import axios from "axios";
import { setAlert } from "../actions/alert";
import { PAY_BOOKING_SUCCESS, PAY_BOOKING_FAILURE } from "./types";

// Create Request
export const createRequest = async (dispatch, payload) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/request/", payload, config);
    setAlert(dispatch, "Request Sent!");
  } catch (err) {
    console.log(err.message);
  }
};

export const payRequest = async (dispatch, payload) => {
  try {
    const { id, amount } = payload;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ id, amount });
    await axios.post(`/api/request/${id}/pay`, body, config);
    dispatch({ type: PAY_BOOKING_SUCCESS, payload: id });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch({
        type: PAY_BOOKING_FAILURE,
        payload: err.response.data.message,
      });
    }
    console.log(err.message);
  }
};
