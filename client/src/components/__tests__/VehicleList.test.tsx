import React from "react";
import { render } from "@testing-library/react";
import Theme from "../../Theme";
import VehicleList from "../VehicleList";

test("Render <VehicleList />", () => {
  render(
    <Theme>
      <VehicleList />
    </Theme>
  );
});
