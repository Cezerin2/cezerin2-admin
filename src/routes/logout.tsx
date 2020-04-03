import * as auth from "./../lib/auth";

const Logout = () => {
  function componentWillMount() {
    auth.removeToken();
  }
  componentWillMount();
  return null;
};

export default Logout;
