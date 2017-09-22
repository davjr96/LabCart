import React from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout";
const Protected = ({ authData }) => {
  return <Checkout />;
};
export default connect(state => ({ authData: state.user.data }))(Protected);
