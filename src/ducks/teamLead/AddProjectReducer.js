let initialState = {
  projectName: "",
  description: ""
};

const UPDATE_PROJECTNAME = "UPDATE_PROJECTNAME";
const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";

export function updateProjectName(name) {
  return {
    type: UPDATE_PROJECTNAME,
    payload: name
  };
}

export function updateDescription(desc) {
  return {
    type: UPDATE_DESCRIPTION,
    payload: desc
  };
}

export default function AddProjectReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_PROJECTNAME":
      return { ...state, projectName: action.payload };

    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload };

    default:
      return state;
  }
}
