import React, { Component, Fragment } from "react";
import { Container, Button, Message } from "semantic-ui-react";
import styled from "styled-components";
import { Modal, ModalBody } from "@kata-kit/modal";
import { AppRoot, Topbar } from "@kata-kit/layout";
import { variables } from "@kata-kit/theme";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeaderContainer from "modules/core/profile/Header";
import { privateApi } from "utils/api/callApi";
import { QuestProps } from "./Page.Container";
import MathWrapper from "components/MathWrapper";
import { SoalUserInterface } from "interfaces/soal";
import { notification } from "antd";
import LoadingPara from "components/LoadingPara";

interface QuestState {
  data: SoalUserInterface;
  pilih: string;
  selected: number;
  isModalOpen: boolean;
  score: number;
  loading: boolean;
  answer: string | null;
  hasil: string;
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

export default class Page extends Component<QuestProps, QuestState> {
  constructor(props: QuestProps) {
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
      hasil: "",
    };
  }

  componentDidMount() {
    const { selected, goBack } = this.props;

    privateApi()
      .get(`/quest/menu`)
      .then((res) => {
        if (res.data.data !== "open") {
          goBack();
        } else {
          this.setState({ loading: true });
          privateApi()
            .post("/quest/generate", {
              id_user: selected && selected.id,
            })
            .then((res) =>
              setTimeout(
                () => {
                  privateApi()
                    .get(`/quest/soal/${this.state.selected - 1}`, {
                      params: {
                        id_user: selected && selected.id,
                      },
                    })
                    .then((res) => {
                      if (res.data.data.result) {
                        privateApi()
                          .get(`/quest/answer/`, {
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
      });
  }

  submit = () => {
    const { selected } = this.props;
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
        .put("/quest/correction", data)
        .then((res) => {
          console.dir(res);
          this.setState({ isModalOpen: true, hasil: res.data.hasil });
        });
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
    const { history } = this.props;
    if (this.state.selected === 5) {
      history.push("/user/dashboard");
    } else {
      const id = this.state.selected + 1;
      this.setState({ selected: id });
      history.push(`/user/quest/${id}`);
    }
  };

  back = () => {
    const { history } = this.props;
    const id = this.state.selected - 1;
    this.setState({ selected: id });
    history.push(`/user/quest/${id}`);
  };

  closeModal = () => {
    const { history } = this.props;
    if (this.state.selected !== 5) {
      const id = this.state.selected + 1;
      this.setState({ selected: id, pilih: "", isModalOpen: false });
      history.push(`/user/quest/${id}`);
    } else {
      this.setState({ isModalOpen: false });
      history.push("/user/dashboard");
    }
  };

  componentDidUpdate(prevProps: QuestProps, prevState: { selected: number }) {
    const { selected } = this.state;
    const { match } = this.props;
    if (
      prevState.selected !== selected ||
      prevProps.match.params.id !== match.params.id
    ) {
      this.setState({ loading: true });
      privateApi()
        .get(`/quest/soal/${match.params.id - 1}`, {
          params: {
            id_user: this.props.selected && this.props.selected.id,
          },
        })
        .then((res) => {
          if (res.data.data.result) {
            privateApi()
              .get(`/quest/answer/`, {
                params: { id: res.data.data.id },
              })
              .then((answer) =>
                this.setState({
                  data: res.data.data,
                  loading: false,
                  answer: answer.data.answer,

                  selected: parseInt(match.params.id),
                })
              );
          }
          this.setState({
            data: res.data.data,
            answer: "",
            loading: false,

            selected: parseInt(match.params.id),
          });
        });
    }
  }

  render() {
    const {
      data,
      pilih,
      selected,
      isModalOpen,
      loading,
      answer,
      hasil,
    } = this.state;

    return (
      <AppRoot>
        {console.dir(hasil)}
        <Topbar
          leftContent={
            <div className="flex flex-row items-center">
              <Button basic onClick={() => this.props.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-4" />
                Back
              </Button>
              <h2 className="ml-3 my-0">Quest</h2>
            </div>
          }
        >
          <div className="flex flex-row justify-around items-center">
            <HeaderContainer color="black" showPoint={false} />
          </div>
        </Topbar>

        <Modal show={isModalOpen} onClose={() => this.closeModal()}>
          <ModalBody>
            <div className="m-6 text-center">
              <h2>Kamu {hasil === "true" ? "benar" : "salah"} menjawab!</h2>
              {hasil === "true" && <h4>Kamu mendapatkan 600 Diamond</h4>}

              <Button color="green" onClick={() => this.closeModal()}>
                Lanjut ke Quest Berikutnya
              </Button>
            </div>
          </ModalBody>
        </Modal>

        <Container textAlign="center" className="mt-12">
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
                {selected === 5 ? "Submit" : "Next"}
              </Button>
            ) : (
              <Button color="green" onClick={() => this.review()}>
                {selected === 5 ? "Go to Menu" : "Next"}
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
      </AppRoot>
    );
  }
}
