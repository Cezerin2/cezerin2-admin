import React from "react";
import * as auth from "lib/auth";

class Logout extends React.Component {
  componentWillMount() {
    auth.removeToken();
  }

  render() {
    return null;
  }
}
export default Logout;
