import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VehicleProfile from "./VehicleProfile";

const VehiclListStyled = styled.div`
  display: grid;
  background-color: ${(p) => p.theme.colors.white};
  padding: 10px;

  @media only screen and (min-width: ${(p) => p.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 10px;
    padding: 20px 20px 0 20px;
    border-bottom: ${(p) => `2px solid ${p.theme.colors.black}`};
  }

  @media only screen and (min-width: ${(p) => p.theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const apiUrl = "http://localhost:3000/api/vehicle";

const VehicleList: React.FunctionComponent = () => {
  const [vehicleList, setVehicleList] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await fetch(apiUrl, { method: "GET" });
    const data = await res.json();
    setVehicleList(data.vehicles);
  };

  //Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  ///Display null if fetch req fails
  if (vehicleList.length < 1) return null;

  return (
    <VehiclListStyled>
      {vehicleList.map((vehicle, idx) => (
        <VehicleProfile
          id={vehicle.id}
          name={vehicle.media[0]?.name!}
          imgUrl={vehicle.media[0]?.url!}
          index={idx}
          key={vehicle.id}
        />
      ))}
    </VehiclListStyled>
  );
};

export default VehicleList;
