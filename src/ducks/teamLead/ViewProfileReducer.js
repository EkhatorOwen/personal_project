import axios from "axios";

let initialState = {
  name: "",
  jobtitle: "",
  Email: "",
  img: "",
  orgname: "",
  teamname: ""
};

const GET_USER_DETAILS = "GET_USER_DETAILS";

export function getUserDetails() {
  return {
    type: GET_USER_DETAILS,
    payload: axios.get("/api/profile"),
    isLoading: false
  };
}

export default function viewProfileReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER_DETAILS}_PENDING`:
      return {
        ...state
      };

    case `${GET_USER_DETAILS}_FULFILLED`:
      const { data } = action.payload;
      return {
        ...state,
        name: data.name,
        jobtitle: data.jobTitle,
        Email: data.email,
        img: data.img,
        teamname: data.teamName,
        orgName: data.orgName
      };

    default:
      return state;
  }
}
