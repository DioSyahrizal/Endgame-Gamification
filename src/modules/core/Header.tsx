import React, { FC } from "react";

import Grid from "components/Grid";
import ProfileMenu from "./profile/ProfileMenu";

interface HeaderProps {
  color: string;
}

export const Header: FC<HeaderProps> = props => {
  return (
    <Grid.Container verticalAlign="middle" space={22}>
      <Grid.Column>
        <img
          src={require("assets/image/coin.svg")}
          alt="coin-img"
          style={{ width: "30px", height: "30px" }}
        />
      </Grid.Column>
      <Grid.Column style={{ color: props.color }}>400</Grid.Column>
      <Grid.Column>
        <ProfileMenu />
      </Grid.Column>
    </Grid.Container>
  );
};
