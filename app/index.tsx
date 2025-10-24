import { Redirect } from "expo-router";
import React from "react";

const index = () => {
  return <Redirect href="/auth/login" />;
};

export default index;
