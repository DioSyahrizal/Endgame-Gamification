import React, { FC } from "react";

import ProfileMenu from "../ProfileMenu";
import { ScoreProps } from "./Header.Container";
import styled from "styled-components";

// interface HeaderProps {
//   color: string;
// }

// type HeaderPropsColors = HeaderProps & ScoreProps;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Content = styled("div")``;

export const Header: FC<ScoreProps> = (props) => {
  return (
    <Wrapper>
      <Content style={{ color: props.color ? props.color : "white" }}>
        <div className="flex lg:flex-row flex-col justify-center items-center">
          <img
            src={require("assets/image/diamond.svg")}
            alt="diamond-img"
            className="mr-4"
            style={{ width: "30px", height: "30px" }}
          />
          <p className="mr-2" style={{ marginBottom: 0 }}>
            {props.coin}
          </p>

          <img
            src={require("assets/image/coin.svg")}
            alt="coin-img"
            className="mr-4"
            style={{ width: "30px", height: "30px" }}
          />
          <p className="mr-2" style={{ marginBottom: 0 }}>
            {props.point}
          </p>
        </div>
      </Content>
      <Content
        style={{
          marginRight: 10,
          marginLeft: 10,
          marginBottom: 0,
          border: "0.5px solid grey",
          borderRadius: "20px",
          padding: "5px 10px",
          color: "black",
          background: "white",
        }}
      >
        {props.selected && props.selected.name}
      </Content>
      <Content>
        <ProfileMenu selected={props.selected} />
      </Content>
    </Wrapper>
  );
};
