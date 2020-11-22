import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../utils/fetchData";
import useAsync from "../utils/useAsync";
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

  const [data, error, loading] = useAsync(fetchData, apiUrl);

  useEffect(() => {
    !loading && !error && setVehicleList(data?.vehicles);
  }, [data, loading, error]);

  if (vehicleList.length < 0 || !vehicleList) return null;
  return (
    <VehiclListStyled>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong!</div>}
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
