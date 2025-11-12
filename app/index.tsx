import { Redirect } from "expo-router";
import React from "react";

const index = () => {
  return <Redirect href={{ pathname: "/tabs" }} />;
};

export default index;
