import axios from "axios";

let initialState = {
  name: "",
  jobtitle: "",
  Email: "",
  img: "",
  orgName: "",
  teamname: ""
};

const GET_USER_DETAILS = "GET_USER_DETAILS";

const GET_NAME = "GET_NAME";
const GET_JOBTITLE = "GET_JOBTITLE";
const GET_EMAIL = "GET_EMAIL";
const GET_IMG = "GET_IMG";
const GET_ORGNAME = "GET_ORGNAME";
const GET_TEAMNAME = "GET_TEAMNAME";

export function getUserDetails() {
  return {
    type: GET_USER_DETAILS,
    payload: axios.get("/api/profile"),
    isLoading: false
  };
}

export function getName(name) {
  return {
    type: "GET_NAME",
    payload: name
  };
}

export function getJobtitle(title) {
  return {
    type: "GET_JOBTITLE",
    payload: title
  };
}

export function getEmail(email) {
  return {
    type: "GET_EMAIL",
    payload: email
  };
}

export function getImg(img) {
  return {
    type: "GET_IMG",
    payload: img
  };
}

export function getOrgname(img) {
  return {
    type: "GET_ORGNAME",
    payload: img
  };
}

export function getTeamname(team) {
  return {
    type: "GET_TEAMNAME",
    payload: team
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

    case "GET_NAME":
      return {
        ...state,
        name: action.payload
      };

    case "GET_JOBTITLE":
      return {
        ...state,
        jobtitle: action.payload
      };

    case "GET_EMAIL":
      return {
        ...state,
        Email: action.payload
      };

    case "GET_ORGNAME":
      return {
        ...state,
        orgName: action.payload
      };

    case "GET_TEAMNAME":
      return {
        ...state,
        teamname: action.payload
      };

    default:
      return state;
  }
}
