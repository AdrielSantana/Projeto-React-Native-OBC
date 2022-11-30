import { useState } from "react";
import AllPages from "./AllPages";
import HomePage from "./HomePage";

const Routes = () => {
  const [showHome, setShowHome] = useState(false);

  return showHome ? <HomePage /> : <AllPages />;
};

export default Routes;
