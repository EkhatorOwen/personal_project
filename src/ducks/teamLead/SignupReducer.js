let initialState = {
  companyName: "",
  jobTitle: "",
  teamName: ""
};

const UPDATE_COMPANYNAME = "UPDATE_COMPANYNAME";
const UPDATE_JOBTITLE = "UPDATE_JOBTITLE";
const UPDATE_TEAMNAME = "UPDATE_TEAMNAME";

export function updateCompanyName(name) {
  return {
    payload: name,
    type: UPDATE_COMPANYNAME
  };
}

export function updateJobTile(job) {
  return {
    payload: job,
    type: UPDATE_JOBTITLE
  };
}

export function updateTeamName(teamname) {
  return {
    payload: teamname,
    type: UPDATE_TEAMNAME
  };
}

export default function SignupReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_COMPANYNAME":
      return { ...state, companyName: action.payload };

    case "UPDATE_JOBTITLE":
      return { ...state, jobTitle: action.payload };

    case "UPDATE_TEAMNAME":
      return { ...state, teamName: action.payload };

    default:
      return state;
  }
}
