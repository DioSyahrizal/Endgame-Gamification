import React, { Component } from "react";

// import LogoutButton from "~/modules/auth/LogoutButton";
import renderIcon from "utils/renderIcon";
import { ReactComponent as SettingIcon } from "assets/icon/ic_setting.svg";
import { Menu } from "./components";
import { DropdownItem } from "@kata-kit/dropdown";
import { RouteComponentProps, withRouter } from "react-router";
import LogoutButton from "modules/auth/LogoutButton";
import { User } from "interfaces/user";

interface MenuProps {
  selected: User | null | undefined;
}

interface ProfileMenuProps extends MenuProps, RouteComponentProps {}

interface ProfileMenuStates {
  isOpen: boolean;
}

class ProfileMenu extends Component<ProfileMenuProps, ProfileMenuStates> {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;
    const { selected } = this.props;

    return (
      <Menu.Main
        title={`Logged in as ${selected && selected.name}`}
        className={isOpen ? "is-active" : ""}
      >
        <Menu.Row>
          <Menu.Info onClick={this.handleToggle}>
            {renderIcon(SettingIcon)}
            <Menu.Text>Menu</Menu.Text>
          </Menu.Info>
          <Menu.Item>
            <Menu.Dropdown isOpen={isOpen}>
              <Menu.DropdownToggle isOpen={isOpen} toggle={this.handleToggle} />
              <Menu.DropdownMenu isOpen={isOpen}>
                <Menu.DropdownItem>
                  <Menu.NavLink to={`/user/dashboard`}>Dashboard</Menu.NavLink>
                </Menu.DropdownItem>
                <Menu.DropdownItem>
                  <Menu.NavLink to={`/user/leaderboard`}>
                    Leaderboard
                  </Menu.NavLink>
                </Menu.DropdownItem>
                <Menu.DropdownItem>
                  <Menu.NavLink to={"/user/badge"}>My Badge</Menu.NavLink>
                </Menu.DropdownItem>

                <DropdownItem divider />
                <Menu.DropdownItem>
                  <LogoutButton />
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
