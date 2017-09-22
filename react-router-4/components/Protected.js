import React from "react";
import { connect } from "react-redux";
import Items from "./Items";
const Protected = ({ authData }) => {
  return <Items />;
};
export default connect(state => ({ authData: state.user.data }))(Protected);
