import React, { Component, Fragment } from "react";
import { Container, Button, Message } from "semantic-ui-react";
import styled from "styled-components";
import { Modal, ModalBody } from "@kata-kit/modal";
import { AppRoot, Topbar } from "@kata-kit/layout";
import { variables } from "@kata-kit/theme";

import {
  faKey,
  faShoppingCart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Fab, Action } from "react-tiny-fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeaderContainer from "modules/core/profile/Header";
import { privateApi } from "utils/api/callApi";
import { KimiaProps } from "./Page.Container";
import MathWrapper from "components/MathWrapper";
import { capitalizeFirstLetter } from "utils/helper";
import { Link } from "react-router-dom";
import { SoalUserInterface } from "interfaces/soal";
import { notification } from "antd";
import LoadingPara from "components/LoadingPara";
import LoadingCircle from "components/LoadingCircle";

interface Easyfis {
  data: SoalUserInterface;
  pilih: string;
  selected: number;
  isModalOpen: boolean;
  isModalItemOpen: boolean;
  score: number;
  loading: boolean;
  answer: string | null;
  kunci: boolean;
  quantity: number;
  loadKey: boolean;
  examTime: number;
  timeOut: boolean;
  timer: any;
}

const Box = styled("div")`
  background: ${variables.colors.gray10};
  border: 1px solid ${variables.colors.gray30};
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 8px;
  padding: 14px 16px;
  font-weight: 500;
  margin-bottom: 30px;
`;

const TimeWrap = styled("div")`
  padding: 5px 10px;
  border: black 1px solid;
  font-size: 16px;
  border-radius: 5px;
  background: #ffc107;
`;

export default class Page extends Component<KimiaProps, Easyfis> {
  constructor(props: KimiaProps) {
    super(props);

    this.state = {
      data: {
        id: 0,
        question: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        image: "",
        level: "",
        matpel: "",
        id_soaluser: 0,
        result: null,
      },
      answer: "",
      loading: false,
      pilih: "",
      selected: parseInt(this.props.match.params.id),
      isModalOpen: false,
      isModalItemOpen: false,
      score: 0,
      kunci: false,
      quantity: 0,
      loadKey: false,
      examTime: 0,
      timeOut: false,
      timer: null,
    };
  }

  componentDidMount() {
    const { selected, match, goBack } = this.props;
    // const arr = location.pathname.split("/")
    this.setTime();
    privateApi()
      .get(`/menu/${selected && selected.id}`)
      .then((res) => {
        if (match.params.diff === "hard" && res.data.kim_hard === "lock") {
          goBack();
        } else if (
          match.params.diff === "hard" &&
          res.data.kim_hard === "lock"
        ) {
          goBack();
        } else {
          this.setState({ loading: true });
          privateApi()
            .post("/quiz/generate", {
              id_user: selected && selected.id,
              matpel: "kimia",
              level: capitalizeFirstLetter(match.params.diff),
            })
            .then((res) =>
              setTimeout(
                () => {
                  privateApi()
                    .get(`/quiz/soal/${this.state.selected - 1}`, {
                      params: {
                        id_user: selected && selected.id,
                        matpel: "kimia",
                        level: capitalizeFirstLetter(match.params.diff),
                      },
                    })
                    .then((res) => {
                      if (res.data.data.result) {
                        privateApi()
                          .get(`/quiz/answer/`, {
                            params: { id: res.data.data.id },
                          })
                          .then((answer) =>
                            this.setState({
                              data: res.data.data,
                              loading: false,
                              answer: answer.data.answer,
                            })
                          );
                      }
                      this.setState({ data: res.data.data, loading: false });
                      privateApi()
                        .get(`/item/kunci/${selected && selected.id}`)
                        .then((res) => {
                          this.setState({ quantity: res.data.quantity });
                        });
                    });
                },
                res.data.status === "Already add!" ? 0 : 1000
              )
            );
        }
      });
  }

  submit = () => {
    const { selected, history, match } = this.props;
    const soal = { ...this.state.data };
    // validasi pilihan
    if (this.state.pilih) {
      const data = {
        id: soal.id,
        id_soaluser: soal.id_soaluser,
        answer: this.state.pilih,
        id_user: selected && selected.id,
      };
      privateApi()
        .put("/quiz/correction", data)
        .then((res) => console.dir(res));

      if (this.props.match.params.diff === "hard") {
        if (this.state.selected === 5) {
          privateApi()
            .put("/quiz/correction", data)
            .then((res) => {
              privateApi()
                .post("/quiz/score", {
                  id_user: selected && selected.id,
                  level: capitalizeFirstLetter(match.params.diff),
                  matpel: "kimia",
                })
                .then((data) =>
                  this.setState({ score: data.data.score, isModalOpen: true })
                );
            });
        } else {
          const id = this.state.selected + 1;
          this.setState({ selected: id, pilih: "" });
          history.push(`/user/kimia/${match.params.diff}/${id}`);
        }
      } else {
        if (this.state.selected === 10) {
          privateApi()
            .put("/quiz/correction", data)
            .then((res) => {
              privateApi()
                .post("/quiz/score", {
                  id_user: selected && selected.id,
                  level: capitalizeFirstLetter(match.params.diff),
                  matpel: "kimia",
                })
                .then((data) =>
                  this.setState({ score: data.data.score, isModalOpen: true })
                );
            });
        } else {
          const id = this.state.selected + 1;
          this.setState({ selected: id, pilih: "" });
          history.push(`/user/kimia/${match.params.diff}/${id}`);
        }
      }
    } else {
      notification["warning"]({
        message: "Pilihan Kosong",
        description: "Anda belum memilih jawaban!",
        placement: "topRight",
      });
    }

    // jika diujung soal maka submit score
  };

  review = () => {
    const { history, match } = this.props;
    if (match.params.diff === "hard") {
      if (this.state.selected === 5) {
        history.push("/user/kimia");
      } else {
        const id = this.state.selected + 1;
        this.setState({ selected: id });
        history.push(`/user/kimia/${match.params.diff}/${id}`);
      }
    } else {
      if (this.state.selected === 10) {
        history.push("/user/kimia");
      } else {
        const id = this.state.selected + 1;
        this.setState({ selected: id });
        history.push(`/user/kimia/${match.params.diff}/${id}`);
      }
    }
  };

  back = () => {
    const { history, match } = this.props;
    const id = this.state.selected - 1;
    this.setState({ selected: id });
    history.push(`/user/kimia/${match.params.diff}/${id}`);
  };

  buyItem = () => {
    const { selected } = this.props;
    privateApi()
      .put("/item/buykunci", { id_user: selected && selected.id })
      .then((_res) => {
        this.props.buyAction();
        this.setState((prevState) => ({
          quantity: prevState.quantity + 1,
          isModalItemOpen: false,
        }));
      })
      .catch((error) => {
        notification["error"]({
          message: "Error!",
          description: error.response.data.status,
          placement: "topLeft",
        });
      });
  };

  useItem = () => {
    const { selected } = this.props;
    this.setState({ loadKey: true });
    privateApi()
      .put("/item/use", { id_user: selected && selected.id })
      .then((_res) => {
        privateApi()
          .get(`/quiz/answer/`, {
            params: { id: this.state.data.id },
          })
          .then((res) =>
            this.setState((prevState) => ({
              quantity: prevState.quantity - 1,
              kunci: true,
              loadKey: false,
              answer: res.data.answer,
            }))
          );
      });
  };

  setTime = () => {
    const { diff } = this.props.match.params;
    const { data } = this.state;
    const time = diff === "medium" ? 15 : diff === "hard" ? 8 : 0;
    const condition = data.result ? 0 : time;
    const examTime =
      Date.parse(new Date().toString()) +
      1000 * 60 * condition -
      Date.parse(new Date().toString());
    const timer = setInterval(() => this.CountDown(), 1000);
    this.setState({ examTime, timer });
    this.remainingTime();
  };

  CountDown() {
    if (this.state.examTime === 1000) {
      localStorage.setItem("Time", "Timed Up");
      this.handleTimeOut();
    } else if (this.state.examTime > 0) {
      let countDown = this.state.examTime - 1000;
      localStorage.setItem("Time", JSON.stringify(countDown));
      this.setState({ examTime: countDown });
    }
  }

  remainingTime() {
    let seconds = this.leadingZero(
      Math.floor((this.state.examTime / 1000) % 60)
    );
    let minutes = this.leadingZero(
      Math.floor((this.state.examTime / 1000 / 60) % 60)
    );

    return `${minutes}:${seconds}`;
  }

  leadingZero(num: number) {
    if (num < 10) {
      return "0" + num;
    }

    return num;
  }

  handleTimeOut = () => {
    clearInterval(this.state.timer);
    this.setState({
      timeOut: true,
    });
  };

  componentDidUpdate(prevProps: KimiaProps, prevState: { selected: number }) {
    const { selected } = this.state;
    const { match } = this.props;
    if (
      prevState.selected !== selected ||
      prevProps.match.params.id !== match.params.id
    ) {
      this.setState({ loading: true });
      privateApi()
        .get(`/quiz/soal/${match.params.id - 1}`, {
          params: {
            id_user: this.props.selected && this.props.selected.id,
            matpel: "kimia",
            level: match.params.diff,
          },
        })
        .then((res) => {
          if (res.data.data.result) {
            privateApi()
              .get(`/quiz/answer/`, {
                params: { id: res.data.data.id },
              })
              .then((answer) =>
                this.setState({
                  data: res.data.data,
                  loading: false,
                  answer: answer.data.answer,
                  kunci: false,
                  selected: parseInt(match.params.id),
                })
              );
          }
          this.setState({
            data: res.data.data,
            answer: "",
            loading: false,
            kunci: false,
            selected: parseInt(match.params.id),
          });
        });
    }
  }

  goAfterTime = () => {
    const { push } = this.props.history;
    push("/user/fisika");
  };

  render() {
    const {
      data,
      pilih,
      selected,
      isModalOpen,
      score,
      loading,
      answer,
      kunci,
      loadKey,
      isModalItemOpen,
    } = this.state;

    const { diff } = this.props.match.params;

    return (
      <AppRoot>
        <Topbar
          leftContent={
            <div className="flex items-center">
              <Button basic onClick={() => this.props.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-4" />
                Back
              </Button>
              {diff !== "easy" && (
                <TimeWrap className="ml-2">{this.remainingTime()}</TimeWrap>
              )}
            </div>
          }
        >
          <div className="flex flex-row justify-around items-center">
            <HeaderContainer color="black" />
          </div>
        </Topbar>

        <Modal
          show={isModalOpen}
          onClose={() => {
            this.setState({ isModalOpen: false });
            this.props.history.push("/user/kimia");
          }}
        >
          <ModalBody>
            <div className="m-6 text-center">
              <h2>Congratulation!</h2>
              <h4>Your Score is {score}</h4>
              <Link to="/user/kimia">
                <Button color="green">Go back to Menu</Button>
              </Link>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          show={isModalItemOpen}
          onClose={() => this.setState({ isModalItemOpen: false })}
        >
          <ModalBody>
            <div className="m-6 text-center">
              <h2>Buy Kunci Jawaban?</h2>
              <h4>This cost 450</h4>

              <Button color="green" onClick={() => this.buyItem()}>
                Yes
              </Button>
              <Button
                color="red"
                onClick={() => this.setState({ isModalItemOpen: false })}
              >
                No
              </Button>
            </div>
          </ModalBody>
        </Modal>

        <Container textAlign="center" className="mt-12">
          {this.state.timeOut ? this.goAfterTime() : null}
          <h1 style={{ marginTop: "40px", marginBottom: "40px" }}>
            Soal {selected}
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {data.result !== null && this.props.match.params.id > 1 ? (
              <Button onClick={() => this.back()}>Prev</Button>
            ) : (
              <div />
            )}
            {data.result === null ? (
              <Button color="green" onClick={() => this.submit()}>
                {this.props.match.params.diff !== "hard"
                  ? selected === 10
                    ? "Submit"
                    : "Next"
                  : selected === 5
                  ? "Submit"
                  : "Next"}
              </Button>
            ) : (
              <Button color="green" onClick={() => this.review()}>
                {this.props.match.params.diff !== "hard"
                  ? selected === 10
                    ? "Go to Menu"
                    : "Next"
                  : selected === 5
                  ? "Go to Menu"
                  : "Next"}
              </Button>
            )}
          </div>
          <Box>
            <h2 style={{ whiteSpace: "pre-line", textAlign: "justify" }}>
              {loading ? (
                <LoadingPara />
              ) : (
                <MathWrapper text={data ? data.question : ""} />
              )}
            </h2>

            {data.image && (
              <div className="m-4">
                <img
                  style={{ display: "block", margin: "auto" }}
                  src={`data:image/png;base64,${data.image}`}
                  alt="Soal"
                />
              </div>
            )}
          </Box>

          {pilih && (
            <h3>
              Kamu memilih <MathWrapper text={pilih} />
            </h3>
          )}

          {data.result !== null ? (
            <Fragment>
              <Message color={data.result === "true" ? "green" : "red"}>
                <Message.Header>
                  Anda {data.result === "true" ? "Benar" : "Salah"} menjawab
                </Message.Header>
              </Message>
              <Message warning>
                <Message.Header>Jawaban yang benar adalah:</Message.Header>
                <p>
                  <MathWrapper text={answer ? answer : ""} />
                </p>
              </Message>
            </Fragment>
          ) : (
            <>
              {kunci ? (
                loadKey ? (
                  <LoadingCircle />
                ) : (
                  <Message warning>
                    <Message.Header>Kunci Jawaban:</Message.Header>
                    <p>
                      <MathWrapper text={answer ? answer : ""} />
                    </p>
                  </Message>
                )
              ) : null}

              <div className="flex lg:flex-row flex-col justify-center items-center">
                <div className="flex flex-col lg:w-6/12 w-full h-full justify-between">
                  <div className="m-4">
                    <Button
                      size="large"
                      fluid
                      color="red"
                      onClick={() => this.setState({ pilih: data.opt1 })}
                    >
                      <MathWrapper text={`A. ${data.opt1}`} />
                    </Button>
                  </div>
                  <div className="m-4">
                    <Button
                      size="large"
                      fluid
                      color="yellow"
                      onClick={() => this.setState({ pilih: data.opt2 })}
                    >
                      <MathWrapper text={`B. ${data.opt2}`} />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col lg:w-6/12 w-full h-full ">
                  <div className="m-4">
                    <Button
                      size="large"
                      fluid
                      color="green"
                      onClick={() => this.setState({ pilih: data.opt3 })}
                    >
                      <MathWrapper text={`C. ${data.opt3}`} />
                    </Button>
                  </div>
                  <div className="m-4">
                    <Button
                      size="large"
                      fluid
                      color="blue"
                      onClick={() => this.setState({ pilih: data.opt4 })}
                    >
                      <MathWrapper text={`D. ${data.opt4}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Container>
        {data.result === null && (
          <Fab
            mainButtonStyles={{ background: "green" }}
            position={{ bottom: 0, right: 0 }}
            icon={<FontAwesomeIcon icon={faKey} />}
          >
            <Action
              style={{ background: "red" }}
              text="Use Kunci"
              onClick={!kunci ? () => this.useItem() : () => null}
            >
              <span>{this.state.quantity}</span>
            </Action>
            <Action
              style={{ background: "orange" }}
              text="Beli Kunci"
              onClick={() => this.setState({ isModalItemOpen: true })}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </Action>
          </Fab>
        )}
      </AppRoot>
    );
  }
}
