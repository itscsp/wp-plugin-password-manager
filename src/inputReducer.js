const inputReducer = (state, action) => {
  // console.log(state);
  if (action.type == "URL") {
    return {
      ...state,
      inputURL: action.val,
      inputURLValid: action.isValid,
    };
  }

  if (action.type == "USERNAME") {
    return {
      ...state,
      inputUserName: action.val,
      inputUserNameValid: action.isValid,
    };
  }

  if (action.type == "PASSWORD") {
    return {
      ...state,
      inputPassword: action.val,
      inputPasswordValid: action.isValid,
    };
  }

  if (action.type == "NOTE") {
    return {
      ...state,
      inputNote: action.val,
      inputNoteValid: action.isValid,
    };
  }
  return state;
};

export default inputReducer;
