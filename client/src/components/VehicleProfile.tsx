import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../utils/fetchData";
import useAsync from "../utils/useAsync";
import { apiUrl } from "./VehicleList";

interface StyledProps {
  hideBorder: boolean;
}

const VehicleProfileStyled = styled.div<StyledProps>`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: repeat(3, max-content);

  img {
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    width: 150px;
    height: 100%;

    @media only screen and (min-width: ${(p) => p.theme.breakpoints.md}) {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      width: 100%;
      height: auto;
    }
  }

  .profile-info {
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    display: grid;
    grid-template-rows: repeat(3, max-content);
    grid-row-gap: 10px;
    padding: 10px 0 10px 10px;
    border-top: ${(p) =>
      p.hideBorder ? "unset" : `2px solid ${p.theme.colors.grey}`};

    @media only screen and (min-width: ${(p) => p.theme.breakpoints.md}) {
      grid-row: 2 / 3;
      grid-column: 1 / -1;
      text-align: center;
      border-top: unset;
      border-right: ${(p) => `2px solid ${p.theme.colors.grey}`};
      height: 160px;
    }

    h1,
    span,
    p {
      font-family: "Roboto";
    }

    h1 {
      font-size: ${(p) => p.theme.fontSizes.large};
      font-weight: 500;

      @media only screen and (min-width: ${(p) => p.theme.breakpoints.md}) {
        border-top: 2px solid ${(p) => p.theme.colors.black};
        border-bottom: 2px solid ${(p) => p.theme.colors.black};
        width: max-content;
        justify-self: center;
      }
    }

    span {
      font-size: ${(p) => p.theme.fontSizes.small};
      font-weight: 400;
      color: ${(p) => p.theme.colors.black};
      opacity: 0.9;
      @media only screen and (min-width: ${(p) => p.theme.breakpoints.md}) {
        margin-top: 15px;
      }
    }

    p {
      font-size: ${(p) => p.theme.fontSizes.small};
      font-weight: 400;
      margin-top: 10px;
      color: ${(p) => p.theme.colors.black};
      opacity: 0.7;
    }
  }
`;

interface Props {
  id: string;
  name: string;
  imgUrl: string;
  index: number;
}

interface ProfileDataState {
  id: string;
  description: string;
  price: string;
}

const VehicleProfile: React.FunctionComponent<Props> = ({
  id,
  name,
  imgUrl,
  index,
}) => {
  const [profileData, setProfileData] = useState<ProfileDataState | null>(null);

  const [data, error, loading] = useAsync(fetchData, `${apiUrl}/${id}`);

  useEffect(() => {
    !error && !loading && data && setProfileData(data);
  }, [data, error, loading]);

  const hideBorder = index === 0 ? true : false;

  return (
    <VehicleProfileStyled hideBorder={hideBorder}>
      {error && <div>Something went wrong!</div>}
      {loading && <div>Loading...</div>}
      <img src={imgUrl} alt={name} />
      <div className="profile-info">
        <h1>{name}</h1>
        <span>From {profileData?.price}</span>
        <p>{profileData?.description}</p>
      </div>
    </VehicleProfileStyled>
  );
};

export default VehicleProfile;
