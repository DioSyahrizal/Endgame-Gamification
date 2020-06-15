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

const Name = styled("div")`
  margin-right: 15px;
  margin-left: 10;
  margin-bottom: 0;
  border: 0.5px solid grey;
  border-radius: 20px;
  padding: 5px 10px;
  color: black;
  background: white;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Header: FC<ScoreProps> = ({
  showPoint = true,
  point,
  coin,
  selected,
  color,
}) => {
  return (
    <Wrapper>
      <Content style={{ color: color ? color : "white" }}>
        {showPoint ? (
          <div className="flex flex-row justify-center items-center">
            <img
              src={require("assets/image/diamond.svg")}
              alt="diamond-img"
              className="mr-2"
              style={{ width: "30px", height: "30px" }}
            />
            <p className="mr-4" style={{ marginBottom: 0 }}>
              {coin}
            </p>

            <img
              src={require("assets/image/coin.svg")}
              alt="coin-img"
              className="mr-2"
              style={{ width: "30px", height: "30px" }}
            />
            <p className="mr-2" style={{ marginBottom: 0 }}>
              {point}
            </p>
          </div>
        ) : null}
      </Content>
      <Name>{selected && selected.name}</Name>
      <Content>
        <ProfileMenu selected={selected} />
      </Content>
    </Wrapper>
  );
};
