import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Theme from "../../Theme";
import VehicleList, { apiUrl } from "../VehicleList";
import { fetchData } from "../../utils/fetchData";

jest.mock("../../utils/fetchData");

const Container = () => (
  <Theme>
    <VehicleList />
  </Theme>
);

describe("<VehicleList />", () => {
  test("Makes a api request successfully", async () => {
    render(<Container />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(apiUrl);
  });

  test("When api request fails displays error message", async () => {
    (fetchData as jest.Mock).mockRejectedValueOnce("Error!");
    render(<Container />);
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(apiUrl);

    await waitFor(() => {
      expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    });
  });
});
