import React, { Component } from "react";
import {
  Card,
  Image,
  Progress,
  Container,
  Button,
  Placeholder,
} from "semantic-ui-react";
import { Modal, ModalBody } from "@kata-kit/modal";
import Particles from "react-particles-js";

import HeaderContainer from "modules/core/profile/Header";
import { privateApi } from "utils/api/callApi";
import { SoalProps } from "./Page.Container";
import { notification } from "antd";
import { ReactComponent as Diamond } from "assets/image/diamond.svg";
import { ReactComponent as Coin } from "assets/image/coin.svg";
// import Logo from "../../assets/icon/chemistry-logo.svg";

interface States {
  progress: { easy: number; med: number; hard: number };
  menu: { kim_med: string; kim_hard: string };
  isModalOpen: boolean;
  selectedLevel: string;
  loading: boolean;
}

export default class Page extends Component<SoalProps, States> {
  constructor(props: SoalProps) {
    super(props);

    this.state = {
      progress: { easy: 0, med: 0, hard: 0 },
      menu: { kim_med: "lock", kim_hard: "lock" },
      isModalOpen: false,
      selectedLevel: "",
      loading: false,
    };
  }

  componentDidMount = () => {
    const { selected } = this.props;
    this.setState({ loading: true });
    privateApi()
      .get("/quiz/progress", {
        params: {
          id_user: selected && selected.id,
          matpel: "kimia",
        },
      })
      .then((res) => this.setState({ progress: res.data }));

    privateApi()
      .get(`/menu/${selected && selected.id}`)
      .then((res) => this.setState({ menu: res.data, loading: false }));
  };

  buyLevel = (diff: string, currency: string) => {
    const { selected, buyMedium, buyHard } = this.props;
    privateApi()
      .put(`/menu/unlock/kimia/${diff}`, {
        id_user: selected && selected.id,
        currency: currency,
      })
      .then((res) => {
        if (diff === "medium") {
          if (currency === "diamond") {
            currency = "coin";
          }
          buyMedium(currency);
          this.setState({ menu: res.data, isModalOpen: false });
        } else {
          if (currency === "diamond") {
            currency = "coin";
          }
          buyHard(currency);
          this.setState({ menu: res.data, isModalOpen: false });
        }
      })
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
    const { progress, menu, isModalOpen, selectedLevel, loading } = this.state;
    return (
      <div>
        <Modal
          show={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <ModalBody>
            <div className="m-6 text-center">
              <h2 className="mb-12">Buy Level</h2>

              <div className="flex flex-row justify-around items-center m-4">
                <Button
                  color="yellow"
                  style={{ marginRight: 5 }}
                  onClick={() => this.buyLevel(selectedLevel, "diamond")}
                >
                  <div className="flex flex-row justify-between items-center">
                    <span> Buy with</span>
                    <Diamond style={{ width: 20, height: 20, marginLeft: 5 }} />
                  </div>
                </Button>
                <Button
                  color="green"
                  style={{ marginLeft: 5 }}
                  onClick={() => this.buyLevel(selectedLevel, "point")}
                >
                  <div className="flex flex-row justify-between items-center">
                    <span> Buy with</span>
                    <Coin style={{ width: 20, height: 20, marginLeft: 5 }} />
                  </div>
                </Button>
              </div>
              <Button
                color="red"
                style={{ marginTop: 15 }}
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
          <h2 style={{ margin: 0, color: "white" }}>Kimia</h2>
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
                onClick={() => this.props.history.push(`/user/kimia/easy/1`)}
              >
                <Image
                  className="h-auto"
                  src={require("assets/icon/chemistry-logo.svg")}
                  wrapped
                  ui={false}
                  style={{ padding: 20 }}
                />
                <Card.Content>
                  <Card.Header>Easy</Card.Header>
                  <Card.Description>This is an Easiest Test!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Progress
                    value={progress.easy !== null ? progress.easy : 0}
                    total={10}
                    progress="ratio"
                    success={progress.easy === 10 ? true : false}
                  />
                </Card.Content>
              </Card>
            </div>

            {menu.kim_med === "open" ? (
              <div className="mb-6">
                <Card
                  onClick={() =>
                    this.props.history.push(`/user/kimia/medium/1`)
                  }
                >
                  <Image
                    className="h-auto"
                    src={require("assets/icon/chemistry-logo.svg")}
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
                      value={progress.med !== null ? progress.med : 0}
                      total={10}
                      progress="ratio"
                      success={progress.med === 10 ? true : false}
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
                  {loading ? (
                    <Placeholder>
                      <Placeholder.Image square />
                    </Placeholder>
                  ) : (
                    <Image
                      className="h-auto"
                      src={require("assets/icon/lock.svg")}
                      wrapped
                      ui={false}
                      style={{
                        padding: 20,
                      }}
                    />
                  )}

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
                      or 300
                      <img
                        src={require("assets/image/diamond.svg")}
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

            {menu.kim_hard === "open" ? (
              <div className="mb-6">
                <Card
                  onClick={() => this.props.history.push(`/user/kimia/hard/1`)}
                >
                  <Image
                    className="h-auto"
                    src={require("assets/icon/chemistry-logo.svg")}
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
                      value={progress.hard !== null ? progress.hard : 0}
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
                  {loading ? (
                    <Placeholder>
                      <Placeholder.Image square />
                    </Placeholder>
                  ) : (
                    <Image
                      className="h-auto"
                      src={require("assets/icon/lock.svg")}
                      wrapped
                      ui={false}
                      style={{
                        padding: 20,
                      }}
                    />
                  )}

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
                      or 600
                      <img
                        src={require("assets/image/diamond.svg")}
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
