import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import VehicleProfile from "../VehicleProfile";
import Theme from "../../Theme";
import { fetchData } from "../../utils/fetchData";
import { apiUrl } from "../VehicleList";

jest.mock("../../utils/fetchData");

const props = { id: "ftype", name: "BMW", imgUrl: "http://bmw.com", index: 1 };

const mockedResponse = {
  id: "xe",
  description: "Great vehicle",
  price: "£30,000",
};

const Container = () => (
  <Theme>
    <VehicleProfile
      index={props.index}
      name={props.name}
      imgUrl={props.imgUrl}
      id={props.id}
    />
  </Theme>
);

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

  test("Fetches vehicle price, description & displays them", async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(mockedResponse);
    render(<Container />);
    expect(props.id).toBeTruthy();
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(`${apiUrl}/${props.id}`);
    await waitFor(() => {
      expect(screen.getByText(mockedResponse.description)).toBeInTheDocument();
      expect(
        screen.getByText(`From ${mockedResponse.price}`)
      ).toBeInTheDocument();
    });
  });

  test("When api req fails, displays error message", async () => {
    (fetchData as jest.Mock).mockRejectedValueOnce("Error!");
    render(<Container />);
    expect(props.id).toBeTruthy();
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(`${apiUrl}/${props.id}`);
    await waitFor(() => {
      expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    });
  });
});
