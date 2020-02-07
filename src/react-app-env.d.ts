/// <reference types="react-scripts" />

interface Window {
  /** Extended initial Redux store */
  __INITIAL_REDUX_STATE__: any;
  /** Runtime environmemnt variables */
  __GAMA_RUNTIME__: Record<string, string>;
}
