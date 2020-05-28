import React, { useState } from "react";
import { Modal, Switch } from "antd";
import { privateApi } from "utils/api/callApi";

interface iSwitchMenu {
  identifier: "fis_med" | "fis_hard" | "kim_med" | "kim_hard";
  user: any;
}

const SwitchMenu = (props: iSwitchMenu) => {
  const { user, identifier } = props;
  const [active, setActive] = useState(
    user[identifier] === "open" ? true : false
  );
  const [loading, setLoading] = useState(false);

  function handleChange() {
    Modal.confirm({
      title: `Mengaktifkan menu ${identifier}?`,
      content: "Are you sure want to continue?",
      onOk() {
        setLoading(true);
        const url = `/control/${identifier}/${user.id}`;

        privateApi()
          .put(url)
          .then((res) => {
            setActive(res.data[identifier] === "open" ? true : false);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }

  return (
    <Switch
      checkedChildren={<p>Open</p>}
      unCheckedChildren={<p>Lock</p>}
      checked={active}
      loading={loading}
      onChange={handleChange}
      disabled={active}
    />
  );
};

export default SwitchMenu;
