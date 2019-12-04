import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface LoadingProps {
  text?: string;
}

const LoadingCircle: React.FC<LoadingProps> = ({
  text = "Loading",
  ...rest
}) => {
  return (
    <Dimmer active inverted>
      <Loader inverted>{text}</Loader>
    </Dimmer>
  );
};

export default LoadingCircle;
