import { useEffect } from "react";

function noop() {}
export const useOnMount = (onMount: Function = noop) =>
  useEffect(() => {
    onMount();
    // eslint-disable-next-line
  }, []);
