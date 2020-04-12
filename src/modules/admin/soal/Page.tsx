import React, { useState, FC, useContext } from "react";
import { Typography, Table, Button, Drawer } from "antd";
import {
  Button as SemanticButton,
  TextArea,
  Table as Setable,
} from "semantic-ui-react";
import * as yup from "yup";
import XLSX from "xlsx";
import MathWrapper from "components/MathWrapper";
import SideNavContext from "../context/SidenavContext";
import { useOnMount } from "utils/hooks";
import BreadcrumbContext from "../context/BreadcumbContext";
import { privateApi } from "utils/api/callApi";
import { textFormat } from "utils/helper";
import { Formik } from "formik";
import { Form } from "semantic-ui-react";
import { SoalInterface } from "interfaces/soal";

const Page: FC = () => {
  // const [text, setText] = useState("Soal ini adalah $$U= 1/2$$");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [detailSoal, setDetailSoal] = useState<SoalInterface | null>(null);

  const { state: sideNavState, setSideNavState } = useContext(SideNavContext);
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const validationSchema = yup.object({
    question: yup.string().required("Soal Kosong!"),
    opt1: yup.string().required("Pil 1 Kosong"),
    opt2: yup.string().required("Pil 2 Kosong"),
    opt3: yup.string().required("Pil 3 Kosong"),
    opt4: yup.string().required("Pil 4 Kosong"),
    answer: yup.string().required("Jawaban kosong"),
    level: yup.string().required("Level kosong"),
    matpel: yup.string().required("Matpel kosong"),
    profileImg: yup.mixed().label("File"),
  });

  const loadData = () => {
    privateApi()
      .get("/soal")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const submitSoal = (value: any) => {
    const codeImage = image.split("base64,")[1];
    value.profileImg = codeImage;

    privateApi()
      .post("/soal/addsingle", value)
      .then((res) => {
        setOpen(false);
        loadData();
      })
      .catch((err) => console.error(err));
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let baseURL = reader.result;
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e: any) => {
    console.log(e.target.files[0]);

    const gambar = e.target.files[0];
    // setImage(gambar);
    getBase64(gambar)
      .then((result: any) => {
        gambar["base64"] = result;
        console.log("File Is", gambar);
        setImage(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Soal",
      key: "question",
      dataIndex: "question",
      render: (text: string, data: any) => {
        return <p onClick={() => setDetailSoal(data)}>{textFormat(text)}</p>;
      },
    },
    {
      title: "Pil 1",
      key: "opt1",
      dataIndex: "opt1",
      render: (text: string) => {
        return <MathWrapper text={text} />;
      },
    },
    {
      title: "Pil 2",
      key: "opt2",
      dataIndex: "opt2",
      render: (text: string) => {
        return <p>{textFormat(text)}</p>;
      },
    },
    {
      title: "Pil 3",
      key: "opt3",
      dataIndex: "opt3",
      render: (text: string) => {
        return <p>{textFormat(text)}</p>;
      },
    },
    {
      title: "Pil 4",
      key: "opt4",
      dataIndex: "opt4",
      render: (text: string) => {
        return <p>{textFormat(text)}</p>;
      },
    },
    {
      title: "Jawaban",
      key: "answer",
      dataIndex: "answer",
      render: (text: string) => {
        return <p>{textFormat(text)}</p>;
      },
    },
    {
      title: "Level",
      key: "level",
      dataIndex: "level",
      render: (text: string) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Mata Pelajaran",
      key: "matpel",
      dataIndex: "matpel",
      render: (text: string) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Gambar",
      key: "image",
      dataIndex: "image",
      render: (text: string) => {
        return <img src={text ? `data:image/png;base64,${text}` : ""} />;
      },
    },
  ];

  useOnMount(() => {
    const tempSideNavState = { ...sideNavState };
    tempSideNavState["selectedKeys"] = ["soal"];
    setSideNavState(tempSideNavState);
    setBreadcrumbs(["Soal"]);
    loadData();
  });

  return (
    <>
      <Drawer
        title="Detail Soal"
        width={720}
        onClose={() => setDetailSoal(null)}
        visible={!!detailSoal}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <div>
          {" "}
          <MathWrapper text={detailSoal ? detailSoal.question : ""} />{" "}
        </div>
        {detailSoal && detailSoal.image ? (
          <img
            src={detailSoal ? `data:image/png;base64,${detailSoal.image}` : ""}
            alt="Soal"
          />
        ) : null}
        <Setable celled padded>
          <Setable.Header>
            <Setable.Row>
              <Setable.HeaderCell singleLine>Pilihan 1</Setable.HeaderCell>
              <Setable.HeaderCell>Pilihan 2</Setable.HeaderCell>
              <Setable.HeaderCell>Pilihan 4</Setable.HeaderCell>
              <Setable.HeaderCell>Answer</Setable.HeaderCell>
            </Setable.Row>
          </Setable.Header>

          <Setable.Body>
            <Setable.Row>
              <Setable.Cell>
                {detailSoal && <MathWrapper text={detailSoal.opt1} />}
              </Setable.Cell>
              <Setable.Cell singleLine>
                {detailSoal && <MathWrapper text={detailSoal.opt2} />}
              </Setable.Cell>
              <Setable.Cell>
                {detailSoal && <MathWrapper text={detailSoal.opt3} />}
              </Setable.Cell>
              <Setable.Cell textAlign="right">
                {detailSoal && <MathWrapper text={detailSoal.opt4} />}
              </Setable.Cell>
            </Setable.Row>
          </Setable.Body>
        </Setable>
        <div className="text-center">
          {detailSoal && detailSoal.level} - {detailSoal && detailSoal.matpel}
        </div>
      </Drawer>
      <Drawer
        title="Tambah Soal"
        width={720}
        onClose={() => setOpen(false)}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Formik
          initialValues={{
            question: "",
            opt1: "",
            opt2: "",
            opt3: "",
            opt4: "",
            answer: "",
            level: "",
            matpel: "",
            profileImg: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitSoal}
        >
          {({
            handleSubmit,
            values,
            errors,
            handleChange,
            setFieldValue,
            resetForm,
          }) => {
            return (
              <Form layout="horizontal" onSubmit={handleSubmit}>
                <SemanticButton
                  onClick={() => resetForm()}
                  fluid
                  content="Reset"
                />
                <Form.Input
                  name="question"
                  control={TextArea}
                  onChange={handleChange}
                  value={values.question}
                  error={errors.question ? { content: errors.question } : null}
                  fluid
                  placeholder="Soal"
                  label="Soal"
                />

                <MathWrapper text={values.question} />
                <Form.Input
                  name="opt1"
                  onChange={handleChange}
                  value={values.opt1}
                  error={errors.opt1 ? { content: errors.opt1 } : null}
                  fluid
                  placeholder="Pil 1"
                  label="Pilihan 1"
                />
                <Form.Input
                  name="opt2"
                  onChange={handleChange}
                  value={values.opt2}
                  error={errors.opt2 ? { content: errors.opt2 } : null}
                  fluid
                  placeholder="opt2"
                  label="Pilihan 2"
                />
                <Form.Input
                  name="opt3"
                  onChange={handleChange}
                  value={values.opt3}
                  error={errors.opt3 ? { content: errors.opt3 } : null}
                  fluid
                  placeholder="opt3"
                  label="Pilihan 3"
                />
                <Form.Input
                  name="opt4"
                  onChange={handleChange}
                  value={values.opt4}
                  error={errors.opt4 ? { content: errors.opt4 } : null}
                  fluid
                  placeholder="opt4"
                  label="Pilihan 4"
                />
                <Form.Input
                  name="answer"
                  onChange={handleChange}
                  value={values.answer}
                  error={errors.answer ? { content: errors.answer } : null}
                  fluid
                  placeholder="Jawaban"
                  label="Jawaban"
                />

                <Form.Select
                  id="key"
                  name="level"
                  fluid
                  placeholder="Level"
                  label="Level"
                  onChange={(e, v) => setFieldValue("level", v.value)}
                  value={values.level}
                  error={errors.level ? { content: errors.level } : null}
                  options={[
                    { key: "easy", text: "Easy", value: "Easy" },
                    { key: "medium", text: "Medium", value: "Medium" },
                    { key: "hard", text: "Hard", value: "Hard" },
                  ]}
                />

                <Form.Select
                  id="key"
                  name="matpel"
                  fluid
                  placeholder="matpel"
                  label="matpel"
                  onChange={(e, v) => setFieldValue("matpel", v.value)}
                  value={values.matpel}
                  error={errors.matpel ? { content: errors.matpel } : null}
                  options={[
                    { key: "fisika", text: "Fisika", value: "fisika" },
                    { key: "kimia", text: "Kimia", value: "kimia" },
                  ]}
                />

                {/* <SemanticButton
                  onClick={triggerUploadFile}
                  disabled={values.profileImg ? true : false}
                >
                  Upload file
                </SemanticButton> */}

                {/* <input
                  name="profileImg"
                  type="file"
                  ref={(instance) => (uploadFileInstace = instance)}
                  style={{ display: "none" }}
                  onChange={handleChange}
                /> */}
                <input
                  type="file"
                  name="file"
                  onChange={handleFileInputChange}
                  style={{ marginBottom: 10 }}
                />
                <img src={image ? image : ""} />
                {values.profileImg && <p>{values.profileImg}</p>}

                <SemanticButton
                  type="submit"
                  color="green"
                  icon="right arrow"
                  fluid
                  labelPosition="right"
                  content="Submit"
                />
              </Form>
            );
          }}
        </Formik>
      </Drawer>
      <div className="flex justify-between items-center">
        <Typography.Title level={2}>Soal</Typography.Title>
        <Button type="primary" onClick={() => setOpen(true)}>
          Tambah Soal
        </Button>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
      {/* <div className="font-bold">
        <MathWrapper text={text} />
      </div> */}
    </>
  );
};

export default Page;
