import React, { Component, Fragment } from "react";
import styled from "styled-components";
import HeaderContainer from "modules/core/profile/Header";
import { Dashboard } from "@kata-kit/dashboard";
import { privateApi } from "utils/api/callApi";
import { BadgeProps } from "./Page.Container";
import { BadgeState } from "interfaces/badge";
import { Tooltip } from "antd";

interface State {
  userBadge: BadgeState[];
  allBadge: BadgeState[];
}

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 25px;
`;

const Title = styled("p")`
  margin-top: 10px;
`;

export default class Page extends Component<BadgeProps, State> {
  constructor(props: BadgeProps) {
    super(props);

    this.state = {
      userBadge: [],
      allBadge: [],
    };
  }

  componentDidMount() {
    const { selected } = this.props;
    privateApi()
      .get(`/badge/user/${selected && selected.id}`)
      .then((res) => {
        this.setState({ userBadge: res.data });
      });

    privateApi()
      .get("/badge/all")
      .then((res) => {
        this.setState({ allBadge: res.data.badge });
      });
  }

  render() {
    const { userBadge, allBadge } = this.state;
    return (
      <Fragment>
        <Dashboard
          title="Badge"
          floatingElements={
            <Fragment>
              <HeaderContainer color="black" />
            </Fragment>
          }
        >
          <h3 className="mb-6">My Badge</h3>
          <div className="flex flex-row justify-between items-center flex-wrap">
            {userBadge.length !== 0
              ? userBadge.map((badge) => (
                  <Wrapper key={badge.id}>
                    <Tooltip placement="left" title={badge.desription}>
                      <img
                        src={require(`assets/icon/badge/${badge.id}.png`)}
                        alt={badge.name_badge}
                      />
                    </Tooltip>
                    <Title>{badge.name_badge}</Title>
                  </Wrapper>
                ))
              : "User not have a badge!"}
          </div>

          <h3 className="mt-20 mb-6">All Badge</h3>
          <div className="flex flex-row justify-between items-center flex-wrap">
            {allBadge.map((badge) => (
              <Wrapper key={badge.id}>
                <Tooltip placement="left" title={badge.desription}>
                  <img
                    src={require(`assets/icon/badge/${badge.id}.png`)}
                    alt={badge.name_badge}
                  />
                </Tooltip>
                <Title>{badge.name_badge}</Title>
              </Wrapper>
            ))}
          </div>
        </Dashboard>
      </Fragment>
    );
  }
}
