import React, { Component, Fragment } from "react";
import { Container, Button, Message } from "semantic-ui-react";
import styled from "styled-components";
import { Modal, ModalBody } from "@kata-kit/modal";

import { variables } from "@kata-kit/theme";
import { Dashboard } from "@kata-kit/dashboard";
import HeaderContainer from "modules/core/profile/Header";
import { privateApi } from "utils/api/callApi";
import { KimiaProps } from "./Page.Container";
import MathWrapper from "components/MathWrapper";
import { capitalizeFirstLetter } from "utils/helper";
import { Link } from "react-router-dom";
import { SoalUserInterface } from "interfaces/soal";
import { notification } from "antd";

interface Easyfis {
  data: SoalUserInterface;
  pilih: string;
  selected: number;
  isModalOpen: boolean;
  score: number;
  loading: boolean;
  answer: string;
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
      score: 0,
    };
  }

  componentDidMount() {
    const { selected, match } = this.props;
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
              });
          },
          res.data.status === "Already add!" ? 0 : 1000
        )
      );
  }

  submit = (id_soal: number) => {
    const { selected, history, match } = this.props;

    // validasi pilihan
    if (this.state.pilih) {
      const data = {
        id: id_soal,
        answer: this.state.pilih,
        id_user: selected && selected.id,
      };
      privateApi()
        .put("/quiz/correction", data)
        .then((res) => console.dir(res));

      if (this.state.selected === 5) {
        privateApi()
          .put("/quiz/correction", data)
          .then((_res) => {
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
        this.setState({ selected: id });
        history.push(`/user/kimia/${match.params.diff}/${id}`);
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
    if (this.state.selected === 5) {
      history.push("/user/kimia");
    } else {
      const id = this.state.selected + 1;
      this.setState({ selected: id });
      history.push(`/user/kimia/${match.params.diff}/${id}`);
    }
  };

  back = () => {
    const { history, match } = this.props;
    const id = this.state.selected - 1;
    this.setState({ selected: id });
    history.push(`/user/kimia/${match.params.diff}/${id}`);
  };

  componentDidUpdate(_prevProps: any, prevState: { selected: number }) {
    const { selected } = this.state;
    const { match } = this.props;
    if (prevState.selected !== selected) {
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
          this.setState({ data: res.data.data, loading: false });
        });
    }
  }

  render() {
    const { data, pilih, selected, isModalOpen, score } = this.state;

    return (
      <Dashboard
        floatingElements={
          <Fragment>
            <HeaderContainer color="black" />
          </Fragment>
        }
      >
        <Modal
          show={isModalOpen}
          onClose={() => this.setState({ isModalOpen: true })}
        >
          <ModalBody>
            <div className="m-6 text-center">
              <h2>Congratulation!</h2>
              <h4>Your Score is {score}</h4>
              <Link to="/user/dashboard">
                <Button color="green">Go back to Menu</Button>
              </Link>
            </div>
          </ModalBody>
        </Modal>
        <div className="flex flex-row justify-between">
          {data.result !== null && selected !== 1 ? (
            <Button onClick={() => this.back()}>Prev</Button>
          ) : (
            <div />
          )}
          {data.result === null ? (
            <Button onClick={() => this.submit(data.id_soaluser)}>
              {selected === 5 ? "Submit" : "Next"}
            </Button>
          ) : (
            <Button onClick={() => this.review()}>
              {selected === 5 ? "Go to Menu" : "Next"}
            </Button>
          )}
        </div>

        <Container textAlign="center">
          <h1 style={{ marginTop: "40px", marginBottom: "40px" }}>
            Soal {selected}
          </h1>
          <Box>
            <h2 style={{ whiteSpace: "pre-line", textAlign: "justify" }}>
              <MathWrapper text={data ? data.question : ""} />
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
              <Message color={data.result ? "green" : "red"}>
                <Message.Header>
                  Anda {data.result ? "Benar" : "Salah"} menjawab
                </Message.Header>
              </Message>
              <Message warning>
                <Message.Header>Jawaban yang benar adalah:</Message.Header>
                <p>{/* <MathWrapper text={data.answer} /> */}</p>
              </Message>
            </Fragment>
          ) : (
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
          )}
        </Container>
      </Dashboard>
    );
  }
}
