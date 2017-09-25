import * as constants from "../constants";

export const login = data => dispatch => {
  var details = {
    user: data.user,
    pass: data.pass
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch("/api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formBody
  })
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      if (json.status == "OK")
        dispatch({
          type: constants.USER_LOGGED_IN,
          payload: data
        });
      else {
        alert(json.status);
        return {
          type: constants.USER_LOGGED_OUT
        };
      }
    })
    .catch(function(ex) {
      console.log("parsing failed", ex);
    });
};

export function logout() {
  return {
    type: constants.USER_LOGGED_OUT
  };
}
