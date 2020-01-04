import styled from "styled-components";

interface ContainerProps {
  space?: number;
  verticalAlign?: "top" | "middle" | "bottom" | "stretch";
  fluid?: boolean;
}

function getVerticalAlign(
  verticalAlign?: "top" | "middle" | "bottom" | "stretch"
) {
  switch (verticalAlign) {
    case "top": {
      return "flex-start";
    }
    case "middle": {
      return "center";
    }
    case "bottom": {
      return "flex-end";
    }
    case "stretch": {
      return "stretch";
    }
    default: {
      return "flex-start";
    }
  }
}

const Container = styled("div")<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: ${props => getVerticalAlign(props.verticalAlign)};
  margin: ${props => (props.space ? -(props.space / 2) : 0)}px;
  ${props => (props.fluid ? "width: 100%" : "")};

  & > div {
    margin: ${props => (props.space ? props.space / 2 : 0)}px;
  }
`;

interface ColumnProps {
  width?: number;
  textAlign?: "left" | "right" | "center";
}

const Column = styled("div")<ColumnProps>`
  flex: ${props => (props.width ? props.width : 1)};
  text-align: ${props => (props.textAlign ? props.textAlign : "left")};
`;

export default {
  Container,
  Column
};
