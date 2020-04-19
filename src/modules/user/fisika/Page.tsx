import React, { Component } from "react";
import { Card, Image, Progress, Container, Button } from "semantic-ui-react";
import { Modal, ModalBody } from "@kata-kit/modal";
import Particles from "react-particles-js";

import HeaderContainer from "modules/core/profile/Header";
import { privateApi } from "utils/api/callApi";
import { SoalProps } from "./Page.Container";
import { notification } from "antd";
// import Logo from "../../assets/image/saturn.png";

interface States {
  progress: { easy: number; med: number; hard: number };
  menu: { fis_med: string; fis_hard: string };
  isModalOpen: boolean;
  selectedLevel: string;
}

export default class Page extends Component<SoalProps, States> {
  constructor(props: SoalProps) {
    super(props);

    this.state = {
      progress: { easy: 0, med: 0, hard: 0 },
      menu: { fis_med: "lock", fis_hard: "lock" },
      isModalOpen: false,
      selectedLevel: "",
    };
  }

  componentDidMount = () => {
    const { selected } = this.props;
    privateApi()
      .get("/quiz/progress", {
        params: {
          id_user: selected && selected.id,
          matpel: "Fisika",
        },
      })
      .then((res) => this.setState({ progress: res.data }));

    privateApi()
      .get(`/menu/${selected && selected.id}`)
      .then((res) => this.setState({ menu: res.data }));
  };

  buyLevel = (diff: string) => {
    const { selected } = this.props;
    privateApi()
      .put(`/menu/unlock/fisika/${diff}`, { id_user: selected && selected.id })
      .then((res) => this.setState({ menu: res.data, isModalOpen: false }))
      .catch((error) => {
        notification["error"]({
          message: "Error!",
          description: error.response.data.status,
          placement: "topLeft",
        });
        this.setState({ isModalOpen: false });
      });
  };

  confirmModal = (diff: string) => {
    this.setState({ isModalOpen: true, selectedLevel: diff });
  };

  render() {
    const { progress, menu, isModalOpen, selectedLevel } = this.state;
    return (
      <div>
        <Modal
          show={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <ModalBody>
            <div className="m-6 text-center">
              <h2>Buy Level</h2>
              <h4>Are you sure?</h4>

              <Button
                color="green"
                onClick={() => this.buyLevel(selectedLevel)}
              >
                Yes
              </Button>
              <Button
                color="red"
                onClick={() => this.setState({ isModalOpen: false })}
              >
                No
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <div
          className="flex flex-row justify-between items-center content-center py-6 px-12"
          style={{ backgroundColor: "#d64141" }}
        >
          <h2 style={{ margin: 0, color: "white" }}>Fisika</h2>
          <HeaderContainer color="black" />
        </div>
        <Container style={{ marginTop: 20 }}>
          <Particles
            style={{
              position: "absolute",
              top: 84,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            params={{
              particles: {
                number: {
                  value: 30,
                },
                size: {
                  value: 3,
                },
                color: {
                  value: "#000",
                },
                line_linked: {
                  color: "#000",
                },
              },
            }}
          />
          <div className="relative flex flex-col justify-around items-center lg:flex-row">
            <div className="mb-6">
              <Card
                onClick={() => this.props.history.push(`/user/fisika/easy/1`)}
              >
                <Image
                  className="h-auto"
                  src={require("assets/image/saturn.png")}
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Easy</Card.Header>
                  <Card.Description>This is an Easiest Test!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Progress
                    value={progress.easy}
                    total={5}
                    progress="ratio"
                    success={progress.easy === 5 ? true : false}
                  />
                </Card.Content>
              </Card>
            </div>

            {menu.fis_med === "open" ? (
              <div className="mb-6">
                <Card
                  onClick={() =>
                    this.props.history.push(`/user/fisika/medium/1`)
                  }
                >
                  <Image
                    className="h-auto"
                    src={require("assets/image/saturn.png")}
                    wrapped
                    ui={false}
                    style={{
                      padding: 20,
                    }}
                  />
                  <Card.Content>
                    <Card.Header>Medium</Card.Header>
                    <Card.Description>
                      This is an Mediocore Test!
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Progress
                      value={progress.med}
                      total={5}
                      progress="ratio"
                      success={progress.med === 5 ? true : false}
                    />
                  </Card.Content>
                </Card>
              </div>
            ) : (
              <div className="mb-6">
                <Card
                  onClick={() =>
                    this.setState({ selectedLevel: "medium" }, () =>
                      this.confirmModal("medium")
                    )
                  }
                >
                  <Image
                    className="h-auto"
                    src={require("assets/icon/lock.svg")}
                    wrapped
                    ui={false}
                    style={{
                      padding: 20,
                    }}
                  />
                  <Card.Content>
                    <Card.Header>Medium</Card.Header>
                    <Card.Description>
                      This is an Mediocore Test!
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Header className="text-center mb-4 pt-4">
                      Buy with 1000
                      <img
                        src={require("assets/image/coin.svg")}
                        alt="coin"
                        className="inline-block ml-1 mr-1"
                        style={{ width: 30, height: 30 }}
                      />
                      !
                    </Card.Header>
                  </Card.Content>
                </Card>
              </div>
            )}

            {menu.fis_hard === "open" ? (
              <div className="mb-6">
                <Card
                  onClick={() => this.props.history.push(`/user/fisika/hard/1`)}
                >
                  <Image
                    className="h-auto"
                    src={require("assets/image/saturn.png")}
                    wrapped
                    ui={false}
                    style={{
                      padding: 20,
                    }}
                  />
                  <Card.Content>
                    <Card.Header>Hard</Card.Header>
                    <Card.Description>
                      This is the Hardest Test!
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Progress
                      value={progress.hard}
                      total={5}
                      progress="ratio"
                      success={progress.hard === 5 ? true : false}
                    />
                  </Card.Content>
                </Card>
              </div>
            ) : (
              <div className="mb-6">
                <Card
                  onClick={() =>
                    this.setState({ selectedLevel: "hard" }, () =>
                      this.confirmModal("hard")
                    )
                  }
                >
                  <Image
                    className="h-auto"
                    src={require("assets/icon/lock.svg")}
                    wrapped
                    ui={false}
                    style={{
                      padding: 20,
                    }}
                  />
                  <Card.Content>
                    <Card.Header>Hard</Card.Header>
                    <Card.Description>
                      This is the Hardest Test!
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Header className="text-center mb-4 pt-4">
                      Buy with 2000
                      <img
                        src={require("assets/image/coin.svg")}
                        alt="coin"
                        className="inline-block ml-1 mr-1"
                        style={{ width: 30, height: 30 }}
                      />
                      !
                    </Card.Header>
                  </Card.Content>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }
}