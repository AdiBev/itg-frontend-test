import React from "react";
import { render, screen } from "@testing-library/react";
import VehicleProfile from "../VehicleProfile";
import Theme from "../../Theme";

const props = { id: "bmw1", name: "BMW", imgUrl: "http://bmw.com", index: 1 };

describe("<VehicleProfile />", () => {
  test("displays its props", async () => {
    render(
      <Theme>
        <VehicleProfile
          index={props.index}
          name={props.name}
          imgUrl={props.imgUrl}
          id={props.id}
        />
      </Theme>
    );
    const vehicleName = await screen.findByText(props.name, { exact: true });
    const imgElem = await screen.findByAltText(props.name, { exact: true });
    expect(vehicleName).toBeInTheDocument();
    expect(imgElem).toBeInTheDocument();
  });
});
