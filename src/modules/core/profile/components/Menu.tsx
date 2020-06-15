import styled from "styled-components";
import { NavLink as KataNavLink } from "react-router-dom";
import {
  Dropdown as KataDropdown,
  DropdownToggle as KataDropdownToggle,
  DropdownMenu as KataDropdownMenu,
  DropdownItem as KataDropdownItem,
} from "@kata-kit/dropdown";
import { variables } from "@kata-kit/theme";

export const Main = styled.div`
  position: relative;
  width: 120px;
  border-radius: 6px;
  border: solid 1px #e2e6e8;
  background-color: #ffffff;
  padding: 2px 8px;

  &.is-active {
    svg {
      path {
        fill: ${variables.colors.white};
      }
    }
    background-color: ${variables.colors.gray70};
    color: ${variables.colors.white};
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 24px;
  height: 24px;
  background: #f6f7f8;
  border-radius: 50%;
  border: 1px solid #edf1f2;
  cursor: pointer;
  margin-right: 8px;
`;

export const Text = styled.span`
  display: inline-block;
  overflow: hidden;

  margin-left: 8px;
`;

export const Item = styled.div`
  flex: 0 0 auto;
`;

export const NavLink = styled(KataNavLink)`
  display: block;
  width: 100%;
  font-weight: 500;
  clear: both;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: rgb(36, 40, 45) !important;
  padding: 10px 16px;
  overflow: hidden;
  text-decoration: none;
  &:focus,
  &:hover,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    background-color: ${variables.colors.gray10};
  }
`;

export const Dropdown = styled(KataDropdown)``;

export const DropdownToggle = styled(KataDropdownToggle)`
  padding: 0px;
  height: 20px;
  width: 20px;
  background: #ffffff;
  margin: 2px 0 2px 14px;
  border: none;

  i {
    right: 6px !important;
    top: 6px !important;
  }
`;

export const DropdownMenu = styled(KataDropdownMenu)`
  width: 150px;
  right: -10px;
  left: auto;
  margin-top: 5px;
`;

export const DropdownItem = styled(KataDropdownItem)``;
