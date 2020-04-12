import React, { FC } from "react";

import Grid from "components/Grid";
import ProfileMenu from "../ProfileMenu";
import { ScoreProps } from "./Header.Container";

// interface HeaderProps {
//   color: string;
// }

// type HeaderPropsColors = HeaderProps & ScoreProps;

export const Header: FC<ScoreProps> = (props) => {
  return (
    <Grid.Container verticalAlign="middle" space={22}>
      <Grid.Column>
        <img
          src={require("assets/image/coin.svg")}
          alt="coin-img"
          style={{ width: "30px", height: "30px" }}
        />
      </Grid.Column>
      <Grid.Column style={{ color: props.color ? props.color : "white" }}>
        {props.data}
      </Grid.Column>
      <Grid.Column>
        <ProfileMenu />
      </Grid.Column>
    </Grid.Container>
  );
};
