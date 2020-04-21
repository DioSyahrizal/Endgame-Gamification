import React from "react";
import { Placeholder } from "semantic-ui-react";

interface LoadingProps {}

const LoadingPara: React.FC<LoadingProps> = ({ ...rest }) => {
  return (
    <Placeholder fluid>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );
};

export default LoadingPara;
