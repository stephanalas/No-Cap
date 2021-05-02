import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../store/storeComponents/logoutUser";

class Logout extends React.Component {
  render() {
    //thunk needed to update User to blank object in state and remove local storage token
    //then redirect to landing page
    console.log(this.props);
    // console.log("logout ran");
    this.props.logout();
    window.localStorage.clear();
    // this.props.history.push("/");
    return "";
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ownProps };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
