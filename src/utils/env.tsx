import get from "lodash-es/get";

/**
 * Loads environment variable set at runtime.
 *
 * @param name key of environment variable to load
 * @param defaultValue fallback value
 */
export function getRuntimeEnv(name: string, defaultValue?: string) {
  return get(
    window,
    ["__GAMA_RUNTIME__", name],
    defaultValue || defaultEnvs[name] || undefined
  );
}

/**
 * Loads build-time environment variables through `process.env`.
 *
 * @param name key of environment variable to load
 * @param defaultValue fallback value
 */
export function getReactEnv(name: string, defaultValue?: string) {
  return get(process.env, name, defaultValue || defaultEnvs[name] || undefined);
}

/**
 * Fallback environment variable.
 */
export const defaultEnvs: { [key: string]: string } = {
  REACT_APP_RUNTIME_GAMA_SERVICE_URL: "https://env-berhasil.com"
};
