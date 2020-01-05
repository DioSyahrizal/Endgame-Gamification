import React, { Component } from "react";

// import LogoutButton from "~/modules/auth/LogoutButton";
import renderIcon from "utils/renderIcon";
import { ReactComponent as SettingIcon } from "assets/icon/ic_setting.svg";
import { Menu } from "./components";
import { DropdownItem } from "@kata-kit/dropdown";
import { RouteComponentProps, withRouter } from "react-router";

interface ProfileMenuProps extends RouteComponentProps {}

interface ProfileMenuStates {
  isOpen: boolean;
}

class ProfileMenu extends Component<ProfileMenuProps, ProfileMenuStates> {
  state = {
    isOpen: false
  };

  handleToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <Menu.Main
        title={`Logged in as User`}
        className={isOpen ? "is-active" : ""}
      >
        <Menu.Row>
          <Menu.Info onClick={this.handleToggle}>
            {renderIcon(SettingIcon)}
            <Menu.Text>Settings</Menu.Text>
          </Menu.Info>
          <Menu.Item>
            <Menu.Dropdown isOpen={isOpen}>
              <Menu.DropdownToggle isOpen={isOpen} toggle={this.handleToggle} />
              <Menu.DropdownMenu isOpen={isOpen}>
                <Menu.DropdownItem>
                  <Menu.NavLink to={`/setting/account`}>Account</Menu.NavLink>
                </Menu.DropdownItem>

                <DropdownItem divider />
                <Menu.DropdownItem>
                  <Menu.NavLink to={`/logout`}>Logout</Menu.NavLink>
                </Menu.DropdownItem>
              </Menu.DropdownMenu>
            </Menu.Dropdown>
          </Menu.Item>
        </Menu.Row>
      </Menu.Main>
    );
  }
}

export default withRouter(ProfileMenu);
