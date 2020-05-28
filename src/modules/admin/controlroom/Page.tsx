import React, { Fragment, FC, useContext, useState } from "react";
import SideNavContext from "../context/SidenavContext";
import { useOnMount } from "utils/hooks";
import BreadcrumbContext from "../context/BreadcumbContext";
import { Typography, Table, Tabs, Drawer, notification } from "antd";
import { textFormat } from "utils/helper";
import { privateApi } from "utils/api/callApi";
import { ControlUser } from "interfaces/user";
import SwitchMenu from "./components/SwitchMenu";
import UserForm from "./components/UserForm";

const Page: FC = (props) => {
  const { TabPane } = Tabs;
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState<ControlUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { state: sideNavState, setSideNavState } = useContext(SideNavContext);
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const submitUser = (values: any) => {
    privateApi()
      .put("/control/user", values)
      .then((_res) => {
        notification["success"]({
          message: "Success!",
          description: `Success update ${values.name} data!`,
          placement: "topLeft",
        });
        setDisabled(true);
        setDetail(null);
        loadData();
      });
  };

  const loadData = () => {
    setLoading(true);
    privateApi()
      .get("/control/user")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useOnMount(() => {
    const tempSideNavState = { ...sideNavState };
    tempSideNavState["selectedKeys"] = ["controlroom"];
    setSideNavState(tempSideNavState);
    setBreadcrumbs(["Control Room"]);
    loadData();
  });

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      render: (text: string, data: any) => {
        return (
          <p onClick={() => setDetail(data)} style={{ cursor: "pointer" }}>
            {textFormat(text)}
          </p>
        );
      },
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      render: (text: string) => {
        return <p>{textFormat(text)}</p>;
      },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      render: (text: string) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (text: string) => {
        return <p>{textFormat(text)}</p>;
      },
    },
    {
      title: "Point",
      key: "point",
      dataIndex: "point",
      render: (text: string) => {
        return <p>{text}</p>;
      },
    },
  ];

  return (
    <Fragment>
      <Drawer
        onClose={() => setDetail(null)}
        title="Detail User"
        width={720}
        visible={!!detail}
      >
        <p>Nama: {detail && detail.name} </p>
        <p>Email: {detail && detail.email}</p>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Menu" key="1">
            <div className="flex flex-row justify-between mb-4">
              <p>Fisika Medium</p>
              {detail && <SwitchMenu identifier="fis_med" user={detail} />}
            </div>
            <div className="flex flex-row justify-between mb-4">
              <p>Fisika Hard</p>
              {detail && <SwitchMenu identifier="fis_hard" user={detail} />}
            </div>
            <div className="flex flex-row justify-between mb-4">
              <p>Kimia Medium</p>
              {detail && <SwitchMenu identifier="kim_med" user={detail} />}
            </div>
            <div className="flex flex-row justify-between mb-4">
              <p>Kimia hard</p>
              {detail && <SwitchMenu identifier="kim_hard" user={detail} />}
            </div>
          </TabPane>
          <TabPane tab="Data User" key="2">
            <UserForm
              disabled={disabled}
              submit={submitUser}
              handler={() => setDisabled(!disabled)}
              user={detail}
            />
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
        ,
      </Drawer>
      <div className="flex justify-between items-center">
        <Typography.Title level={2}>Control Room</Typography.Title>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </Fragment>
  );
};

export default Page;
