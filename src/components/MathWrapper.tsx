import React, { FC } from "react";
import MathJax from "react-mathjax4";

interface Props {
  text: string;
}

const MathWrapper: FC<Props> = (props: Props) => {
  return (
    <div>
      <MathJax.Context
        input="ascii"
        onLoad={() => console.log("Loaded MathJax script!")}
        onError={(
          MathJax: {
            Hub: { Queue: (arg0: any) => void; Typeset: () => any };
          },
          error: any
        ) => {
          console.warn(error);
          console.log("Encountered a MathJax error, re-attempting a typeset!");
          MathJax.Hub.Queue(MathJax.Hub.Typeset());
        }}
        script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
        options={{
          asciimath2jax: {
            useMathMLspacing: true,
            delimiters: [["$$", "$$"]],
            preview: "none",
          },
        }}
      >
        <MathJax.Text text={props.text} />
      </MathJax.Context>
    </div>
  );
};

export default MathWrapper;
