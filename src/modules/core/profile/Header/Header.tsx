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
      <Grid.Column style={{ color: props.color ? props.color : "white" }}>
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2">{props.coin}</p>
          <img
            src={require("assets/image/diamond.svg")}
            alt="coin-img"
            className="mr-4"
            style={{ width: "30px", height: "30px" }}
          />

          <p className="mr-2">{props.point}</p>
          <img
            src={require("assets/image/coin.svg")}
            alt="coin-img"
            className="mr-4"
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      </Grid.Column>
      <Grid.Column style={{ color: props.color ? props.color : "white" }}>
        {props.selected && props.selected.name}
      </Grid.Column>
      <Grid.Column>
        <ProfileMenu selected={props.selected} />
      </Grid.Column>
    </Grid.Container>
  );
};
