import { StatusBar } from "react-native";
import React from "react";

import Routes from "./src/Routes";

const App = () => {
  return (
    <>
      <StatusBar barStyle={"auto"} />
      <Routes />
    </>
  );
};

export default App;
