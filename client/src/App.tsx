import React from "react";
import BaseStyles from "./BaseStyles";
import VehicleList from "./components/VehicleList";
import Theme from "./Theme";

function App() {
  return (
    <Theme>
      <BaseStyles />
      <VehicleList />
    </Theme>
  );
}

export default App;
